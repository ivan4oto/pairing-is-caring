from django.urls import path
from main.views import (
    PairingSessionListApi,
    PairingSessionCreateApi,
    PairingGroupListApi,
    PairingGroupCreateApi,
    PairingSessionUpdateApi,
    PairingSessionGetUsersApi
    )


urlpatterns = [
    path('sessions/list/', PairingSessionListApi.as_view(), name='list-sessions'),
    path('sessions/get-users/<int:session_id>/', PairingSessionGetUsersApi.as_view(), name='get-session-users'),
    path('sessions/create/', PairingSessionCreateApi.as_view(), name='create-sessions'),
    path('sessions/<int:session_id>/update/', PairingSessionUpdateApi.as_view(), name='update'),
    path('groups/list/', PairingGroupListApi.as_view(), name='list-groups'),
    path('groups/create/', PairingGroupCreateApi.as_view(), name='create-groups'),
]
