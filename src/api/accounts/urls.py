from django.urls import path
from accounts.views import (
    AccountCreateApi,
    AccountUpdateApi,
    AccountListApi
)


urlpatterns = [
    path('create/', AccountCreateApi.as_view(), name='create'),
    path('<int:account_id>/update/', AccountUpdateApi.as_view(), name='update'),
    path('list/', AccountListApi.as_view(), name='list'),
    path('list/<str:group_name>', AccountListApi.as_view(), name='list-by-group')
]
