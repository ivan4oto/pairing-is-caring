from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from main.models import PairingSession
from main.services import get_athletes_in_this_session
from accounts.utils import inline_serializer

# Create your views here.
class PairingSessionListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.DateTimeField()

    def get(self, request):
        pairing_sessions = PairingSession.objects.all()

        data = self.OutputSerializer(pairing_sessions, many=True).data

        return Response(data)


# da pomislim dali ni trqbwa tova?
class PairingSessionListPairGroupsApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.DateTimeField()
        athletes = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'username': serializers.CharField(),
            'email': serializers.CharField()
        })

    def get(self, request):
        pairing_sessions = PairingSession.objects.all()
        for session in pairing_sessions:
            session.athletes = get_athletes_in_this_session(session.id)
        data = self.OutputSerializer(pairing_sessions, many=True).data

        return Response(data)