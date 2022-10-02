from django.db import models


# Create your models here.
class PairingSession(models.Model):
    start_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"pairingSession {self.id}"


class PairingGroup(models.Model):
    name = models.CharField(max_length=50)
    createdBy = models.CharField(max_length=50) # Account.email
    ownedBy = models.CharField(max_length=50) # Account.email

    def __str__(self):
        return str(self.name)
