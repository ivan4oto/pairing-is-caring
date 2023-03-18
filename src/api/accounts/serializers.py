from rest_framework import serializers
from accounts.models import Account
from accounts.utils import get_object, inline_serializer
from main.models import PairingGroup, PairingSession
from main.services import create_new_session
from main.serializers import PairingSessionSerializer, PairingGroupSerializer
from fileupload.models import File
from fileupload.serializers import FileSerializer


class AccountUpdateSerializer(serializers.ModelSerializer):
    pairing_session = PairingSessionSerializer(required=False, allow_null=True)
    pairing_group = PairingGroupSerializer(required=False, allow_null=True)
    profile_image = FileSerializer(required=False, allow_null=True)
    
    class Meta:
        model = Account
        fields = [
            'id',
            'is_active',
            'pairing_session',
            'pairing_group',
            'profile_image',
            'username'
        ]
 
    def update(self, instance, validated_data):
        session_data = validated_data.get('pairing_session', {})
        group_data = validated_data.get('pairing_group', {})
        file_data = validated_data.get('profile_image', {})
        if session_data:
            session = get_object(PairingSession, pk=session_data.get('id'))
            # If no session found with the id given in the request,
            # and no session found on the instance, a new session is created
            # with the parameters given in the request
            session = session if session else create_new_session(session_data)
            instance.pairing_session = session 
        if group_data:
            group = get_object(PairingGroup, default_object=instance.pairing_group, pk=group_data.get('id'))
            instance.pairing_group = group
        if file_data:
            image = get_object(File, pk=file_data.get('id'))
            instance.profile_image = image
        
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance
    
class AccountOutputSerializer(serializers.Serializer):
    pairing_session = PairingSessionSerializer(required=False, allow_null=True)
    pairing_group = PairingGroupSerializer(required=False, allow_null=True)
    profile_image = FileSerializer(required=False, allow_null=True)

    class Meta:
        model = Account
        fields = [
            "id",
            "is_active",
            "email",
            "username",
            "pairing_session",
            "pairing_group",
            "profile_image"
        ]

