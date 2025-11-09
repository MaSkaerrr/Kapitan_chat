from typing import Any

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from jsonschema.protocols import Validator
from rest_framework.exceptions import ValidationError

from chat_main_api.models import Message
from chat_main_api.serializers import MessageSerializer


class MainConsumer(AsyncJsonWebsocketConsumer):
    group_name = "chats_main"

    async def connect(self):
        if self.scope['user'].is_anonymous:
            await self.close()
            return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def chat_message_preprocess(self, content: dict[str, Any]):
        def create_message():
            if 'attachment_ids' not in content:
                content['attachment_ids'] = []
            s = MessageSerializer(data=content)
            s.is_valid(raise_exception=True)
            s = s.save()
            return s
        try:
            msg = await sync_to_async(create_message)()
        except ValidationError:
            return

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message',
                'message': await sync_to_async(lambda: MessageSerializer(msg).data, thread_sensitive=True)(),
            }
        )

    async def chat_message_edit_preprocess(self, content: dict[str, Any]):
        msg = Message(**content)
        msg.is_edited = True
        await msg.asave()

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message_edit',
                'message': await sync_to_async(lambda: MessageSerializer(msg).data, thread_sensitive=True)(),
            }
        )

    async def chat_message(self, event):
        message = event['message']
        if self.scope['user'].id not in message['chat']['users']: return
        await self.send_json({
            'type': 'message',
            'data': message
        })

    async def chat_message_edit(self, event):
        message = event['message']
        if self.scope['user'].id not in message['chat']['users']: return
        await self.send_json({
            'type': 'message_edit',
            'data': message
        })

    async def receive_json(self, content: dict[str, Any], **kwargs):
        print("Data just received!", content)  # TODO
        match (content['type']):
            case "message":
                await self.chat_message_preprocess(content['data'])
            case "message_edit":
                await self.chat_message_edit(content['data'])
