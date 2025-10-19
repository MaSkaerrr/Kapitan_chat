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
        (CHANNEL, CHANNEL),
    ]


class Chat(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=32)
    description: str = models.TextField(max_length=256)
    type: ChatType = models.CharField(choices=ChatType.choices)

    created_at: datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime = models.DateTimeField(auto_now_add=True)

    users: list[User] = models.ManyToManyField(User)

    messages: list[Message]


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
    type: str = models.CharField(max_length=32)
    messages: list[Message] = models.ManyToManyField(Message, related_name="attachments")

