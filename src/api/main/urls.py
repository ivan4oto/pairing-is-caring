from django.urls import path
from main.views import (
    PairingSessionListApi,
    PairingSessionCreateApi,
    PairingGroupListApi,
    PairingGroupCreateApi,
    PairingSessionUpdateApi
    )


urlpatterns = [
    path('sessions/list/', PairingSessionListApi.as_view(), name='list-sessions'),
    path('sessions/create/', PairingSessionCreateApi.as_view(), name='list-sessions'),
    path('sessions/<int:session_id>/update/', PairingSessionUpdateApi.as_view(), name='update'),
    path('groups/list/', PairingGroupListApi.as_view(), name='list-groups'),
    path('groups/create/', PairingGroupCreateApi.as_view(), name='create-groups')
]
