from django.db import models

# Create your models here.
class Chat(models.Model):
    id = models.AutoField(primary_key=True)


class Message(models.Model):
    id = models.AutoField(primary_key=True)


class Attachment(models.Model):
    id = models.AutoField(primary_key=True)


