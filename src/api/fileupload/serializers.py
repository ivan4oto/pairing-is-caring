from rest_framework import serializers


class FileSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    file = serializers.CharField()
    file_name = serializers.CharField()
    file_type = serializers.CharField()
    url = serializers.CharField()