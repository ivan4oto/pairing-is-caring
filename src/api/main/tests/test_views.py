from django.test import TestCase
from django.urls import reverse
from django.utils.timezone import datetime
import pytz

from main.models import PairingGroup, PairingSession


class TestSessionsApi(TestCase):

    def create_session(self):
        return PairingSession.objects.create(
            start_time=datetime(2023, 3, 3, 20, 8, 7, 127325, tzinfo=pytz.UTC),
            title = "Session Title",
            description = "Lorem ipsum bla bla"
        )

    def test_list_view(self):
        session = self.create_session()
        url = reverse("list-sessions")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        resp_title = resp.json()[0].get("title")
        resp_start_time = resp.json()[0].get("start_time")
        resp_description = resp.json()[0].get("description")

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp_title, session.title)
        self.assertEqual(resp_start_time, "2023-03-03T20:08:07.127325Z")
        self.assertEqual(resp_description, session.description)

    def test_create_session(self):
        url = reverse("create-sessions")
        resp = self.client.post(url, {
            "start_time": "2010-01-02T20:08:07.127325Z"
        })
        self.assertEqual(resp.status_code, 200)
        session_in_db = PairingSession.objects.all()
        self.assertEqual(len(session_in_db), 1)
        self.assertEqual(session_in_db[0].start_time, datetime(2010, 1, 2, 20, 8, 7, 127325, tzinfo=pytz.UTC))
        self.assertEqual(resp.json().get("id"), "1")
        self.assertEqual(resp.json().get("start_time"), "2010-01-02T20:08:07.127325Z")

    def test_create_group(self):
        url = reverse("create-groups")
        resp = self.client.post(url, {
            "name": "MyGroup",
            "createdBy": "Checheneca",
            "ownedBy": "Frodo"
        })
        self.assertEqual(resp.status_code, 201)
        grp_in_db = PairingGroup.objects.all()
        self.assertEqual(len(grp_in_db), 1)
        self.assertEqual(grp_in_db[0].name, "MyGroup")
        self.assertEqual(grp_in_db[0].createdBy, "Checheneca")
        self.assertEqual(grp_in_db[0].ownedBy, "Frodo")
