from django.test import TestCase
from django.urls import reverse

from accounts.models import Account


class TestAccountApi(TestCase):

    def create_account(self):
        return Account.objects.create(
            email = "mail@abv.bg",
            username = "revanger",
            password = "123456"
        )

    def test_list_view(self):
        acc = self.create_account()
        url = reverse("list")
        resp = self.client.get(url)
        result_username = resp.json()[0].get("username")
        result_email = resp.json()[0].get("email")

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(result_email, acc.email)
        self.assertEqual(result_username, acc.username)

    def test_get_by_id(self):
        acc = self.create_account()
        url = reverse("get-by-id", kwargs =  {"account_id": 1} )
        resp = self.client.get(url)

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json().get("id"), 1)
        self.assertEqual(resp.json().get("username"), acc.username)
        self.assertEqual(resp.json().get("email"), acc.email)
        
    def test_get_by_id__DoesNotExist(self):
        acc = self.create_account()
        url = reverse("get-by-id", kwargs = {"account_id": 2})
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 404)

    def test_create(self):
        url = reverse("create")
        resp = self.client.post(url, {
            "email": "novmail@abv.bg",
            "username": "randomuser",
            "password": "123456"
        })
        self.assertEqual(resp.status_code, 201)
        acc = Account.objects.first()
        self.assertEqual(acc.id, 1)
        self.assertEqual(acc.username, "randomuser")
        self.assertEqual(acc.email, "novmail@abv.bg")
        self.assertNotEqual(acc.password, "123456")

    def test_update(self):
        acc = self.create_account()
        url = reverse("update", kwargs = {"account_id": 1})
        fetched_acc = Account.objects.first()
        self.assertEqual(fetched_acc.id, 1)
        self.assertEqual(fetched_acc.username, "revanger")
        self.assertEqual(fetched_acc.is_active, True)

        resp = self.client.post(url, {
            "is_active": False,
            "username": "nashiquzar"
        })
        self.assertEqual(resp.status_code, 200)
        updated_account = Account.objects.first()
        self.assertEqual(updated_account.is_active, False)
        self.assertEqual(updated_account.username, "nashiquzar")

    def test_delete(self):
        acc = self.create_account()
        url = reverse("delete", kwargs = {"account_id": 1})
        fetched_acc = Account.objects.first()
        self.assertTrue(fetched_acc)

        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, 200)
        deleted_acc = Account.objects.first()
        self.assertFalse(deleted_acc)

    def test_token_obtain_pair(self):
        self.create_account()
        acc = Account.objects.first()
        acc.set_password("123456")
        acc.save()

        url = reverse("token_obtain_pair")
        resp = self.client.post(url, {
            "email": "mail@abv.bg",
            "password": "123456"
        })
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.json().get("access"))
        self.assertTrue(resp.json().get("refresh"))
        response_user = resp.json().get("user")
        self.assertEqual(response_user.get("id"), acc.id)
        self.assertEqual(response_user.get("email"), "mail@abv.bg")
        self.assertEqual(response_user.get("is_active"), True)

    def test_token_obtain_pair__WrongCredentials(self):
        self.create_account()
        acc = Account.objects.first()
        acc.set_password("123456")
        acc.save()

        url = reverse("token_obtain_pair")
        resp = self.client.post(url, {
            "email": "mail@abv.bg",
            "password": "azsamahilottroya"
        })
        self.assertEqual(resp.status_code, 401)
        self.assertIsNone(resp.json().get("access"))
        self.assertIsNone(resp.json().get("refresh"))
        self.assertIsNone(resp.json().get("user"))
        response_error = resp.json().get("detail")
        self.assertTrue(response_error)
        self.assertEqual(response_error, "No active account found with the given credentials")