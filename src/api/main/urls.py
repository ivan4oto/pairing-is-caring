from django.urls import path
from main.views import PairingSessionListPairGroupsApi, PairingSessionListApi


urlpatterns = [
    path(
        'list-groups/', 
        PairingSessionListPairGroupsApi.as_view(),
        name='list-groups'
        ),
    path('list/', PairingSessionListApi.as_view(), name='list')
]
