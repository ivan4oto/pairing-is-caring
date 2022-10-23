from django.contrib import admin
from fileupload.models import File

class FileAdmin(admin.ModelAdmin):
    list_display = [
        'file', 'file_name', 'file_type'
    ]

admin.site.register(File, FileAdmin)