from rest_framework import serializers
from accounts.models import Account
from accounts.utils import get_object
from main.models import PairingGroup, PairingSession
from main.serializers import PairingSessionSerializer, PairingGroupSerializer


class AccountUpdateSerializer(serializers.ModelSerializer):
    pairing_session = PairingSessionSerializer(required=False)
    pairing_group = PairingGroupSerializer(required=False, allow_null=True)
    
    class Meta:
        model = Account
        fields = ['id', 'is_active', 'pairing_session', 'pairing_group']
 
    def update(self, instance, validated_data):
        session_data = validated_data.get('pairing_session', {})
        group_data = validated_data.get('pairing_group', {})
        if session_data:
            session = get_object(PairingSession, default_object=instance.pairing_session, pk=session_data.get('id'))   
            instance.pairing_session = session 
        elif group_data:
            group = get_object(PairingGroup, default_object=instance.pairing_group, pk=group_data.get('id')) 
            instance.pairing_group = group
        
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance