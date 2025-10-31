from rest_framework import serializers
from .models import UserSettings, Lang

from pathlib import Path
import json
from django.conf import settings

def load_locale(code: str) -> dict:
    path = Path(settings.LANGDIR) / f"{code}.json"
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)



class UserSettingsSerializer(serializers.ModelSerializer):
    user = serializers.CurrentUserDefault()
    
    language = serializers.ChoiceField(choices=Lang.choices)
    theme = serializers.BooleanField(default=False)
    locale = serializers.SerializerMethodField(read_only=True)
    language_choices = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserSettings
        fields = ["id","user", "language", "theme", "locale", "language_choices"]

    def get_locale(self, obj):
        try:
            return load_locale(obj.language)
        except FileNotFoundError:
            return {"_error": "locale file not found"}
        
    def get_language_choices(self, obj):
        return [v for v, l in Lang.choices]