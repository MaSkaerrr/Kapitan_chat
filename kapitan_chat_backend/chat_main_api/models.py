from __future__ import annotations
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class ChatType:
    DIRECT = "DIRECT"
    GROUP = "GROUP"
    CHANNEL = "CHANNEL"

    choices = [
        (DIRECT, DIRECT),
        (GROUP, GROUP),
        (CHANNEL, CHANNEL), # just a prototype, will be unused as now
    ]


class Chat(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=32, null=True, blank=True)
    description: str = models.TextField(max_length=256, null=True, blank=True)
    type: ChatType = models.CharField(choices=ChatType.choices)

    created_at: datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime = models.DateTimeField(auto_now_add=True)

    users: list[User] = models.ManyToManyField(User, related_name='chats')
    created_by: User = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_created')

    messages: list[Message]

    def __str__(self):
        return self.name


class Message(models.Model):
    id: int = models.AutoField(primary_key=True)
    content: str = models.TextField(max_length=2048, null=True)
    is_edited: bool = models.BooleanField(default=False)
    reply_to: Message = models.ForeignKey('Message', related_name="replies", on_delete=models.CASCADE, null=True, blank=True)

    created_at: datetime = models.DateTimeField(auto_now_add=True)

    user: User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    chat: Chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")


class Attachment(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=64)
    storage_id: str = models.CharField(max_length=64) # хєш-айді з сховища, усі однакові файли мають однаковий хеш, але можуть мати різні назви, тому зберігати окремо файли з назвами не ефективно. Айді хєшу з сервісу сховання файлів
    type: str = models.CharField(max_length=32)
    message: Message = models.ForeignKey(Message, on_delete=models.SET_NULL, related_name="attachments", null=True)


    def __str__(self):
        return self.name
