from rest_framework import serializers, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.utils import get_object
from main.serializers import PairingSessionUpdateSerializer

from main.models import PairingGroup, PairingSession
from main.services import group_create, session_create


class PairingSessionListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.DateTimeField()
        title = serializers.CharField()
        description = serializers.CharField()

    def get(self, request):
        pairing_sessions = PairingSession.objects.all()
        data = self.OutputSerializer(pairing_sessions, many=True).data

        return Response(data)

class PairingSessionCreateApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.DateTimeField()
        description = serializers.CharField()

    class InputSerializer(serializers.Serializer):
        start_time = serializers.DateTimeField()

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session = session_create(**serializer.validated_data)
        data = self.OutputSerializer(session, many=False).data

        return Response(data)

class PairingSessionUpdateApi(generics.UpdateAPIView):
    queryset = PairingSession.objects.all()
    serializer_class = PairingSessionUpdateSerializer
    def update(self, request, session_id, *args, **kwargs):
        instance = get_object(PairingSession, pk=session_id)
        instance.description = request.data.get('description')
        instance.save()

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


###
# Pairing Group API
###

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
