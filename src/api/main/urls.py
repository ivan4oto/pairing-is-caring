from django.urls import path
from main.views import PairingSessionListPairGroupsApi


urlpatterns = [
    path(
        'list-groups/', 
        PairingSessionListPairGroupsApi.as_view(),
        name='list-groups'
        ),
]
