from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.viewsets import ModelViewSet 
# Create your views here.

class UserSettingsViewSet(ModelViewSet):
    queryset = UserSettings.objects.all()
    serializer_class = UserSettingsSerializer
    permission_classes = []