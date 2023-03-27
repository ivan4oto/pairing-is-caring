from django.test import TestCase

from accounts.models import Account
from accounts.services import account_create, account_list
from main.models import PairingGroup, PairingSession


class TestAccountServices(TestCase):

    def create_account(self):
        return Account.objects.create(
            email = "mail@abv.bg",
            username = "revanger",
            password = "123456"
        )
    
    def test_account_create(self):
        pairing_session = PairingSession()
        pairing_session.title = "Just a Title"
        pairing_session.save()
        user = account_create(email="nqkavemail@abv.bg", username="nqkavusername", password="parola", pairing_session=pairing_session)
        self.assertEqual(user.email, "nqkavemail@abv.bg")
        self.assertEqual(user.username, "nqkavusername")
        self.assertEqual(user.pairing_session, pairing_session)
        account = Account.objects.first()
        self.assertEqual(user, account)

    def test_account_list(self):
        group = PairingGroup()
        group.name = "burgas"
        group.save()
        self.create_account()
        user_in_grp = Account.objects.create(
            email = "chiposanobmw@abv.bg",
            username = "toqtestneemoi",
            password = "beshemidadennazaem",
            pairing_group = group
        )
        accounts_with_grp = account_list(group_name="burgas")
        self.assertEqual(len(accounts_with_grp), 1)
        self.assertEqual(accounts_with_grp[0].email, user_in_grp.email)
        all_accounts = account_list()
        self.assertEqual(len(all_accounts), 2)
