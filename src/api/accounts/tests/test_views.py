from django.test import TestCase
from django.urls import reverse

from accounts.models import Account


class AccountApiTest(TestCase):

    def create_account(self):
        return Account.objects.create(
            email='mail@abv.bg',
            username='revanger'            
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
