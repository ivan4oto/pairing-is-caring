from rest_framework import serializers
from fileupload.models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'file', 'file_name', 'file_type']
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            }
        }
