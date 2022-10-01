from datetime import datetime
from django.conf import settings

from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.utils import inline_serializer, get_object
from accounts.models import Account
from accounts.services import account_update, account_create
from main.models import PairingSession


class AccountCreateApi(APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.CharField()
        username = serializers.CharField()
        password = serializers.CharField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pairing_session = PairingSession()
        pairing_session.save()
        account_create(**serializer.validated_data, pairing_session=pairing_session)
        return Response(status=status.HTTP_201_CREATED)


class AccountUpdateApi(APIView):
    class InputSerializer(serializers.Serializer):
        pairing_session = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'start_time': serializers.DateTimeField(),
        })
        is_active = serializers.BooleanField()

    def post(self, request, account_id):
        request_data = request.data
        if request_data.get('pairing_session') is None:
            pairing_session = PairingSession()
            pairing_session.save()
            request_data['pairing_session'] = {
                "id": pairing_session.id,
                "start_time": pairing_session.start_time
            }
        serializer = self.InputSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        account = get_object(Account, pk=account_id)
        account_update(account=account, data=serializer.validated_data)

        return Response(status=status.HTTP_200_OK)


class AccountListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        pairing_session = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'start_time': serializers.DateTimeField(),
        })
        id = serializers.IntegerField()
        is_active = serializers.BooleanField()
        email = serializers.CharField()
        username = serializers.CharField()
        
    def get(self, request):
        accounts = Account.objects.all() # reduce the admins/superusers
        data = self.OutputSerializer(accounts, many=True).data
        return Response(data)      


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
