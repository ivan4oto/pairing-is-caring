from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from accounts.serializers import UserGetSerializer, UserPostSerializer
from accounts.mixins import MultiSerializerViewSetMixin
from rest_framework import viewsets
from rest_framework.response import Response


class UserViewSet(MultiSerializerViewSetMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    serializer_action_classes = {
        'list': UserGetSerializer,
        'create': UserPostSerializer,
    }
    queryset = User.objects.all()


class LoginViewSet(viewsets.ViewSet):
    def create(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Return suitable success response.
            login(request, user)
        else:
            # Return an 'invalid login' error message.
            pass
