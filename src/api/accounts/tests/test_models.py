from unittest.mock import Mock
from django.test import TestCase

from accounts.models import Account, CustomAccountManager


class TestCustomAccountManager(TestCase):
    def create_account(self):
        return Account.objects.create(
            email = "mail@abv.bg",
            username = "revanger",
            password = "123456"
        )

    def test_create_user__RaisesValueError(self):
        custom_account_manager = CustomAccountManager()
        self.assertRaises(ValueError, custom_account_manager.create_user, "stoyankolev@abv.bg", None)
        self.assertRaises(ValueError, custom_account_manager.create_user, None, "ahil")

    def test_create_superuser(self):
        custom_account_manager = CustomAccountManager()
        my_mock = Mock()
        my_mock.return_value = Account()
        custom_account_manager.model = my_mock
        user = custom_account_manager.create_superuser("these", "are_mocked", "anyways")
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_admin)
        self.assertTrue(user.is_staff)
