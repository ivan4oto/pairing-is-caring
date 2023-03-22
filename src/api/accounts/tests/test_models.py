from django.test import TestCase

from accounts.models import CustomAccountManager


class TestCustomAccountManager(TestCase):
    def test_create_userRaises(self):
        custom_account_manager = CustomAccountManager()
        self.assertRaises(ValueError, custom_account_manager.create_user, "stoyankolev@abv.bg", None)
        self.assertRaises(ValueError, custom_account_manager.create_user, None, "ahil")
