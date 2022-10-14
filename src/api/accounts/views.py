from datetime import datetime
from wsgiref import validate
from django.conf import settings
from django.core import serializers as core_serializer

from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.utils import inline_serializer, get_object, serialize_account_for_jwt
from accounts.models import Account
from accounts.services import account_update, account_create, account_list
from main.models import PairingGroup, PairingSession


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

class PairingGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PairingGroup
        fields = ['id', 'name', 'createdBy', 'ownedBy']
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            }
        }

class PairingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PairingSession
        fields = ['id']
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            }
        }

class AccountSerializer(serializers.ModelSerializer):
    pairing_session = PairingSessionSerializer()
    pairing_group = PairingGroupSerializer()
    
    class Meta:
        model = Account
        fields = ['id', 'is_active', 'pairing_session', 'pairing_group']
 
    def update(self, instance, validated_data):
        session_data = validated_data.get('pairing_session', {})
        session = get_object(PairingSession, default_object=instance.pairing_session, pk=session_data.get('id'))    
        print(validated_data)
        print(session.id)
        group_data = validated_data.get('pairing_group', {})
        group = get_object(PairingGroup, default_object=instance.pairing_group, pk=group_data.get('id')) 
        
        instance.pairing_session = session
        instance.pairing_group = group
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance



class AccountUpdateApi(APIView):
    # class InputSerializer(serializers.Serializer):
    #     pairing_session = inline_serializer(fields={
    #         'id': serializers.IntegerField()
    #     })
    #     pairing_group = inline_serializer(fields={
    #         'id': serializers.IntegerField()
    #     }, allow_null=True)
    #     is_active = serializers.BooleanField()

    def post(self, request, account_id):
        account = get_object(Account, pk=account_id)
        print(request.data)
        serializer = AccountSerializer(account, data=request.data, partial=True)
        
        # import pdb; pdb.set_trace()
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # account = get_object(Account, pk=account_id)
        # account_update(account=account, data=serializer.validated_data)

        return Response(status=status.HTTP_200_OK)


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
            data['user'] = serialize_account_for_jwt(self.user, include_fields=[
                'id', 'username', 'email', 'pairing_group'
            ])
            data['formats'] = core_serializer.get_serializer_formats()
            data['expiresIn'] = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME') + datetime.now()
            return data

    serializer_class = MyTokenObtainPairSerializer
