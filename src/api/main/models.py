from django.db import models

# Create your models here.
class PairingSession(models.Model):
    start_time = models.TimeField(auto_now_add=True)
    
