from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from main.models import PairingSession

# Create your views here.
class PairingSessionListApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.TimeField()

    def get(self, request):
        pairing_sessions = user_list()

        data = self.OutputSerializer(pairing_sessions, many=True).data

        return Response(data)

class PairingSessionListPairGroupsApi(APIView):
    class OutputSerializer(serializers.Serializer):
        id = serializers.CharField()
        start_time = serializers.TimeField()

    def get(self, request):
        pairing_sessions = user_list()

        data = self.OutputSerializer(pairing_sessions, many=True).data

        return Response(data)