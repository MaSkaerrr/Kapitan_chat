from django.core.handlers.asgi import ASGIRequest
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .models import Message, Chat, Attachment
from .serializers import MessageSerializer, ChatSerializer, AttachmentSerializer

from drf_spectacular.utils import extend_schema

# Create your views here.
def list_permitted(self, qs):
    queryset = qs

    page = self.paginate_queryset(queryset)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)

@extend_schema(tags=['messages'])
class MessageView(ModelViewSet):
    """
    Пайплайн публікації повідомлення:
    Якщо повідомлення з вкладеним файлом ітд
        1. завантажити файл на сервіс для файлів, та отримати хеш
        2. завантажити attachment на сервер та отримати його id
        3. опублікувати повідомлення
    Якщо вкладення нема - просто завантажити повідомлення на сервер
    """
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="chat",
                type=int,
                location='query',
                required=True,
            )
        ]
    )
    def list(self, request: ASGIRequest, *args, **kwargs):
        if (chat_id := request.GET.get('chat')) is None:
            return Response({"error": "chat query parameter is required!"}, status=status.HTTP_400_BAD_REQUEST)
        return list_permitted(self, Message.objects.filter(user_id=request.user.id, chat_id=chat_id))

    def retrieve(self, request, *args, **kwargs):
        instance: Message = self.get_object()
        if request.user.id not in instance.chat.users:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@extend_schema(tags=['chat'])
class ChatView(mixins.CreateModelMixin,
               mixins.RetrieveModelMixin,
               mixins.ListModelMixin,
               GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

    def list(self, request, *args, **kwargs):
        return list_permitted(self, Chat.objects.filter(users__id=request.user.id))

    def retrieve(self, request, *args, **kwargs):
        instance: Chat = self.get_object()
        if request.user.id not in instance.users:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@extend_schema(tags=['attachments'])
class AttachmentView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AttachmentSerializer
    queryset = Attachment.objects.all()
