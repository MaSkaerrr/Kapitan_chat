from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Message, Chat, Attachment
from .serializers import MessageSerializer, ChatSerializer, AttachmentSerializer


# Create your views here.
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


class ChatView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()


class AttachmentView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AttachmentSerializer
    queryset = Attachment.objects.all()