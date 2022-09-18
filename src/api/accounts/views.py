from django.contrib.auth.models import User
from accounts.serializers import UserGetSerializer, UserPostSerializer, MyTokenObtainPairSerializer
from accounts.mixins import MultiSerializerViewSetMixin
from accounts.permissions import IsPostOrIsAuthenticated
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView



class UserViewSet(MultiSerializerViewSetMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    serializer_action_classes = {
        'list': UserGetSerializer,
        'create': UserPostSerializer,
    }
    permission_classes = [IsPostOrIsAuthenticated]
    queryset = User.objects.all()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer