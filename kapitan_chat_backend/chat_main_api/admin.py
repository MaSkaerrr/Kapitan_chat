from django.contrib import admin
from .models import * 
# Register your models here.

admin.site.register(Attachment)
admin.site.register(Message)
admin.site.register(Chat)