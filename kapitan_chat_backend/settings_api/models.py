from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.



class Lang(models.TextChoices):
    empty = "another"
    EN_US = "en-US"
    RU_RU = "ru-RU"
    UK_UA = "uk-UA"


class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    language = models.CharField(default=Lang.EN_US,max_length=10,choices=Lang.choices)
    # true is dark theme
    theme = models.BooleanField(default=False)




