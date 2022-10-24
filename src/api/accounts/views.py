from datetime import datetime
from django.conf import settings
from django.core import serializers as core_serializer

from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.utils import inline_serializer, get_object
from accounts.models import Account
from accounts.serializers import AccountUpdateSerializer
from accounts.services import account_create, account_list
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
    def post(self, request, account_id):
        account = get_object(Account, pk=account_id)
        serializer = AccountUpdateSerializer(account, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AccountListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        pairing_session = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'start_time': serializers.DateTimeField(),
        })
        pairing_group = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'name': serializers.CharField(),
            'createdBy': serializers.CharField(),
            'ownedBy': serializers.CharField()
        })
        profile_image = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'file': serializers.FileField()
        })
        id = serializers.IntegerField()
        is_active = serializers.BooleanField()
        email = serializers.CharField()
        username = serializers.CharField()

    def get(self, request, group_name=None):
        if group_name:
            accounts = account_list(group_name=group_name) # reduce the admins/superusers
        else:
            accounts = account_list() # reduce the admins/superusers
        data = self.OutputSerializer(accounts, many=True).data
        return Response(data)


class AccountDeleteApi(APIView):
    def delete(self, request, account_id, field=None):
        account_obj = get_object(Account, pk=account_id)
        if field is None:
            account_obj.delete()
        setattr(account_obj, field, None)
        account_obj.save()
        return Response(status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
        def validate(self, attrs):
            data = super().validate(attrs)
            refresh = self.get_token(self.user)
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)

            # Add extra responses here
            user_data = AccountListApi.OutputSerializer(self.user).data
            data['user'] = user_data
            data['formats'] = core_serializer.get_serializer_formats()
            data['expiresIn'] = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME') + datetime.now()
            return data

    serializer_class = MyTokenObtainPairSerializer
