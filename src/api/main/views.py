from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

from main.models import PairingGroup, PairingSession
from main.services import group_create, session_create


class PairingSessionListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.DateTimeField()

    def get(self, request):
        pairing_sessions = PairingSession.objects.all()
        data = self.OutputSerializer(pairing_sessions, many=True).data

        return Response(data)

class PairingSessionCreateApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.DateTimeField()

    class InputSerializer(serializers.Serializer):
        start_time = serializers.DateTimeField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session = session_create(**serializer.validated_data)
        data = self.OutputSerializer(session, many=False).data

        return Response(data)

class PairingGroupListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        name = serializers.CharField()
        createdBy = serializers.CharField()
        ownedBy = serializers.CharField()

    def get(self, request):
        pairing_groups = PairingGroup.objects.all()
        data = self.OutputSerializer(pairing_groups, many=True).data

        return Response(data)


class PairingGroupCreateApi(APIView):
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField()
        createdBy = serializers.CharField()
        ownedBy = serializers.CharField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group_create(**serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)
