from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet

from .models import Message, Chat, Attachment
from .serializers import MessageSerializer, ChatSerializer, AttachmentSerializer


# Create your views here.
class MessageView(ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class ChatView(ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()


class AttachmentView(ModelViewSet):
    serializer_class = AttachmentSerializer
    queryset = Attachment.objects.all()