from datetime import datetime
from typing import Any

from django.contrib.auth.models import User
from rest_framework import serializers

from users_api.serializers import MeUserSerializer
from .models import Message, Chat, Attachment, ChatType


class ChatSerializer(serializers.ModelSerializer):
    def validate(self, data: dict[str, Any]) -> dict[str, Any]:
        if data['created_by'] not in data['users']:
            raise serializers.ValidationError("Chat must include user that created it")
        if data['type'] == ChatType.DIRECT:
            if len(data['users']) != 2:
                raise serializers.ValidationError("DIRECT chat can only have 2 users.")
            if data['name']:
                raise serializers.ValidationError("DIRECT chat cant have name.")
            if data['description']:
                raise serializers.ValidationError("DIRECT chat cant have description.")

        return data

    class Meta:
        model = Chat
        fields = '__all__'


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    user: User = MeUserSerializer(read_only=True)
    user_id: int = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='user')
    attachment_ids: list[Attachment] = serializers.PrimaryKeyRelatedField(many=True, queryset=Attachment.objects.all(), write_only=True, source='attachments')
    attachments: list[Attachment] = AttachmentSerializer(many=True, read_only=True)
    chat_id: int = serializers.PrimaryKeyRelatedField(write_only=True, required=True, queryset=Chat.objects.all(), source='chat')
    chat: Chat = ChatSerializer(read_only=True)


    def validate(self, attributes: dict[str, Any]) -> dict[str, Any]:
        if attributes['user'] not in attributes['chat'].users:
            raise serializers.ValidationError("Message publisher should be related to chat.")
        return attributes


    def create(self, validated_data: dict[str, Any]) -> Message:
        message = Message.objects.create(**validated_data)
        message.save()
        message.chat.updated_at = datetime.now()
        message.save()
        return message


    class Meta:
        model = Message
        fields = '__all__'