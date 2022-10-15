from rest_framework import serializers
from main.models import PairingGroup, PairingSession



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
        fields = ['id', 'start_time']
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            }
        }