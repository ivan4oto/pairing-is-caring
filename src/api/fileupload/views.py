# Example simplified from here
# https://github.com/HackSoftware/Django-Styleguide-Example/blob/master/styleguide_example/files/apis.py

from django.shortcuts import get_object_or_404

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from fileupload.models import File
from fileupload.services import (
    FileDirectUploadService
)



class FileDirectUploadStartApi(APIView):
    class InputSerializer(serializers.Serializer):
        file_name = serializers.CharField()
        file_type = serializers.CharField()

    def post(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        service = FileDirectUploadService()
        presigned_data = service.start(**serializer.validated_data)

        return Response(data=presigned_data)


class FileDirectUploadFinishApi(APIView):
    class InputSerializer(serializers.Serializer):
        file_id = serializers.CharField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file_id = serializer.validated_data["file_id"]

        file = get_object_or_404(File, id=file_id)

        service = FileDirectUploadService()
        service.finish(file=file)

        return Response({"id": file.id})


class FileDirectUploadLocalApi(APIView):
    def post(self, request, file_id):
        file = get_object_or_404(File, id=file_id)

        file_obj = request.FILES["file"]

        service = FileDirectUploadService()
        file = service.upload_local(file=file, file_obj=file_obj)

        return Response({"id": file.id})