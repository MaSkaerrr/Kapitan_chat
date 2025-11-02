from typing import Any

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

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
        msg = await Message.objects.acreate(**content)

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message',
                'message': await sync_to_async(lambda: MessageSerializer(msg).data, thread_sensitive=True)(),
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send_json({
            'type': 'message',
            'data': message
        })


    async def receive_json(self, content: dict[str, Any], **kwargs):
        print("Data just received!", content) #TODO
        match(content['type']):
            case "message": await self.chat_message_preprocess(content['data'])

        #await self.send_json(content)