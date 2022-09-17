from rest_framework import serializers
from django.contrib.auth.models import User


class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]


class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]