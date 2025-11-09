from datetime import datetime, timezone
from typing import Any

from django.contrib.auth.models import User
from rest_framework import serializers

from users_api.serializers import UserSerializer
from .models import Message, Chat, Attachment, ChatType


class ChatSerializer(serializers.ModelSerializer):
    def validate(self, data: dict[str, Any]) -> dict[str, Any]:
        if data['created_by'] not in data['users']:
            raise serializers.ValidationError("Chat must include user that created it")
        if data['type'] == ChatType.DIRECT:
            if len(data['users']) != 2:
                raise serializers.ValidationError("DIRECT chat can only have 2 users.")
            if 'name' in data:
                raise serializers.ValidationError("DIRECT chat cant have name.")
            if 'description' in data:
                raise serializers.ValidationError("DIRECT chat cant have description.")
            if Chat.objects.filter(users__id=data['users'][0].id).filter(users__id=data['users'][1].id).filter(type=ChatType.DIRECT).exists():
                raise serializers.ValidationError("Chat already exists.")

        return data

    class Meta:
        model = Chat
        fields = '__all__'


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    user: User = UserSerializer(read_only=True)
    user_id: int = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='user')
    attachments: list[Attachment] = AttachmentSerializer(many=True, read_only=True)
    attachment_ids: list[Attachment] = serializers.PrimaryKeyRelatedField(many=True, queryset=Attachment.objects.all(), write_only=True, source='attachments')
    chat_id: int = serializers.PrimaryKeyRelatedField(write_only=True, required=True, queryset=Chat.objects.all(), source='chat')
    chat: Chat = ChatSerializer(read_only=True)


    def validate(self, attributes: dict[str, Any]) -> dict[str, Any]:
        if not Chat.objects.filter(users__id=attributes['user'].id, id=attributes['chat'].id).exists():
            raise serializers.ValidationError("Message publisher should be related to chat.")
        return attributes

    def create(self, validated_data: dict[str, Any]) -> Message:
        attachments = validated_data.pop('attachments', [])
        message = Message.objects.create(**validated_data)
        if attachments:
            message.attachments.set(attachments)
        message.chat.updated_at = datetime.now(tz=timezone.utc)
        message.chat.save()

        return message

    class Meta:
        model = Message
        fields = '__all__'