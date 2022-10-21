from django.urls import path
from fileupload.views import (
    FileDirectUploadFinishApi,
    FileDirectUploadLocalApi,
    FileDirectUploadStartApi
)


urlpatterns = [
    path('start/', FileDirectUploadStartApi.as_view(), name='start'),
    path('finish/', FileDirectUploadFinishApi.as_view(), name='finish'),
    path("local/<str:file_id>/", FileDirectUploadLocalApi.as_view(), name='local'),
]
