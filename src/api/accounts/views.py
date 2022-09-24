from datetime import datetime
from django.conf import settings

from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.utils import inline_serializer
from accounts.models import Account


class AccountCreateApi(APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.CharField()
        username = serializers.CharField()
        password = serializers.CharField()
        def create(self, validated_data):
            account = Account(
                email=validated_data['email'],
                username=validated_data['username']
            )
            account.set_password(validated_data['password'])
            account.save()
            return account
    
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(status=status.HTTP_201_CREATED)


class AccountUpdateApi(APIView):
    class InputSerializer(serializers.Serializer):
        pairing_session = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'start_time': serializers.DateTimeField(),
        })
        is_active = serializers.BooleanField()



    
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(status=status.HTTP_201_CREATED)




class MyTokenObtainPairView(TokenObtainPairView):
    class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
        def validate(self, attrs):
            data = super().validate(attrs)
            refresh = self.get_token(self.user)
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)

            # Add extra responses here
            data['username'] = self.user.username
            data['expiresIn'] = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME') + datetime.now()
            return data

    serializer_class = MyTokenObtainPairSerializer
