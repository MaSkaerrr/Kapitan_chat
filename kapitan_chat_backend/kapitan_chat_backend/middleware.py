from urllib.parse import parse_qs

from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser, User
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken


class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    @staticmethod
    async def __get_user(user_id):
        try:
            return await User.objects.aget(id=user_id)
        except User.DoesNotExist:
            return AnonymousUser()

    async def __call__(self, scope, receive, send):
        query = scope.get('query_string', 'b').decode()
        parsed = parse_qs(query)
        tokens = parsed.get('token')

        if tokens:
            token = tokens[0]
            try:
                validated = AccessToken(token)
                user_id = validated['user_id']
                scope['user'] = await self.__get_user(user_id)
            except TokenError as e:
                scope['user'] = AnonymousUser()

        return await super().__call__(scope, receive, send)
