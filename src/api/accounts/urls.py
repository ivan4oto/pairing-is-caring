from django.urls import path
from accounts.views import (
    AccountCreateApi,
    AccountUpdateApi
)


urlpatterns = [
    path('create/', AccountCreateApi.as_view(), name='create'),
    path('<int:account_id>/update/', AccountUpdateApi.as_view(), name='update')
]
