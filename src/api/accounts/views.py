from django.contrib.auth.models import User
from accounts.serializers import UserGetSerializer, UserPostSerializer
from accounts.mixins import MultiSerializerViewSetMixin
from rest_framework import viewsets, permissions



class UserViewSet(MultiSerializerViewSetMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    serializer_action_classes = {
        'list': UserGetSerializer,
        'create': UserPostSerializer,
    }
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
