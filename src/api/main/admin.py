from django.contrib import admin
from main.models import PairingSession

class PairingSessionAdmin(admin.ModelAdmin):
    list_display = ['id', 'start_time']

admin.site.register(PairingSession, PairingSessionAdmin)