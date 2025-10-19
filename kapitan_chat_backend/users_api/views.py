from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import logging

from .serializers import RegisterSerializer, MeUserSerializer

logger = logging.getLogger(__name__)

# Create your views here.
class RegisterView(CreateAPIView):
    permission_classes = ()
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetMe(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MeUserSerializer


    def get(self, request: Request) -> Response:
        user = request.user
        logger.info(f"Idk {user.id} {user}")
        user = User.objects.get(id=user.id)
        logger.info(user)
        serialized = (MeUserSerializer(user)
                      .data)
        logger.info(serialized)
        return Response(serialized, status=status.HTTP_200_OK)