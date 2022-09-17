from rest_framework import routers
from accounts.views import UserViewSet, LoginViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'login', LoginViewSet, basename="Login")
