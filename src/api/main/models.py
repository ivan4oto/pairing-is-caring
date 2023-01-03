from django.db import models
from django.utils.timezone import now


class PairingSession(models.Model):
    start_time = models.DateTimeField(default=now)
    title = models.CharField(max_length=50, default="Title")
    description = models.TextField(null=True, blank=True)
    

    def __str__(self):
        return f"pairingSession {self.id}"


class PairingGroup(models.Model):
    name = models.CharField(max_length=50)
    createdBy = models.CharField(max_length=50) # Account.email
    ownedBy = models.CharField(max_length=50) # Account.email

    def __str__(self):
        return str(self.name)
