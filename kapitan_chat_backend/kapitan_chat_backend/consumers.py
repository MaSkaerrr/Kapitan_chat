from typing import Any

from channels.generic.websocket import AsyncJsonWebsocketConsumer


class MainConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print('Somebody just connected!')
        await (self.close() if self.scope['user'].is_anonymous else self.accept())


    async def disconnect(self, close_code):
        print("Somebody just disconnected!", close_code)


    async def receive_json(self, content: dict[str, Any], **kwargs):
        print("Data just received!", content) #TODO
        await self.send_json(content)


    async def chat_message(self, event):
        ...