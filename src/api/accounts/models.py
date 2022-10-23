from datetime import timezone
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from main.models import PairingGroup, PairingSession
from fileupload.models import File

class CustomAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("User must have an email!")
        if not username:
            raise ValueError("User must have an username!")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            pairing_session=PairingSession()
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, username, password):
        user = self.model(
            email=self.normalize_email(email),
            username=username
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.set_password(password)
        user.save()
        return user

class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=50, unique=True)
    pairing_since = models.DateTimeField(verbose_name="paring since", null=True, blank=True)
    pairing_session = models.ForeignKey(PairingSession, null=True, blank=True, on_delete=models.SET_NULL)
    pairing_group = models.ForeignKey(PairingGroup, null=True, blank=True, on_delete=models.SET_NULL)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    profile_image = models.ForeignKey(File, null=True, blank=True, on_delete=models.SET_NULL)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def get_account_image_filepath(self, filename):
        return f'account_images/{self.pk}/{"account_image.png"}'

    @property
    def is_pairing(self) -> bool:
        return self.pairing_session is not None

    @property
    def time_pairing(self):
        now = timezone.now()
        return now.date() - self.pairing_since

    def __str__(self):
        return self.username