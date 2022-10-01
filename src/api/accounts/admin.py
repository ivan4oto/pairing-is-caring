from django.contrib import admin
from accounts.models import Account


class AccountsAdmin(admin.ModelAdmin):
    list_display = [
        'username', 'last_login', 'email', 'pairing_since'
    ]

admin.site.register(Account, AccountsAdmin)