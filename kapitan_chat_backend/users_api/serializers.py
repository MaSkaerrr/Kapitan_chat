from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=False, validators=[UniqueValidator(queryset=User.objects.all(), message='registration.errors.username_already_taken')])
    email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all(), message='registration.errors.email_already_taken')])
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=True)
    phone_number = serializers.CharField(write_only=True, required=True)


    def create(self, validated_data):
        phone_number = validated_data.pop('phone_number')
        if Profile.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError({
                'phone_number': ['registration.errors.phone_number_already_taken']
            })
        user = User.objects.create_user(**validated_data)
        user.profile.phone_number = phone_number
        user.profile.save()
        user.save()
        return user


    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'phone_number')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['id', 'user']

class MeUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'profile']



class GetUsersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = "__all__"

    