from django.urls import path
from main.views import AccountCreateApi


urlpatterns = [
    path('create/', AccountCreateApi.as_view(), name='create'),
]
