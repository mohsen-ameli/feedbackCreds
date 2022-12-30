from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "is_business", "credit", "tier")


class UserFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "email", "password")

    def save(self, **kwargs):
        password = self.validated_data.pop('password')
        self.validated_data['password'] = make_password(password)

        super(UserFullSerializer, self).save(**kwargs)