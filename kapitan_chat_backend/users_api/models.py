from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=256, blank=True)
    phone_number = models.CharField(max_length=11, blank=False, unique=True)
    # TODO: profile_pic = models.CharField