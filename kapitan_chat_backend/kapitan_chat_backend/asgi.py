"""
ASGI config for kapitan_chat_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kapitan_chat_backend.settings')

django_server = get_asgi_application()

from . import ws_urls
from .middleware import JWTAuthMiddleware

application = ProtocolTypeRouter({
    "http": django_server,
    "websocket": JWTAuthMiddleware(URLRouter(ws_urls.websocket_urlpatterns)),
})
