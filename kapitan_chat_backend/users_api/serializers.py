from rest_framework import serializers
from .models import User, Profile


class RegisterSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(write_only=True, required=False)


    def create(self, validated_data):
        validated_data.pop('phone_number')
        user = User.objects.create_user(**validated_data)
        user.profile.phone_number = validated_data.get('phone_number')
        user.save()
        return user


    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'phone_number')