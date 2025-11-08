from django.urls import path

from kapitan_chat_backend.consumers import MainConsumer

websocket_urlpatterns = [
    path('ws/chat', MainConsumer.as_asgi())
]