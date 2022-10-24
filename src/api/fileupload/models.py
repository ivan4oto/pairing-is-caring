# Example simplified from here
# https://github.com/HackSoftware/Django-Styleguide-Example/blob/master/styleguide_example/files/models.py

from django.db import models
from django.conf import settings
from django.urls import reverse
import pathlib
from uuid import uuid4


def file_generate_upload_path(instance, filename):
	# Both filename and instance.file_name should have the same values
    return f"files/{instance.file_name}"

def file_generate_name(original_file_name):
    extension = pathlib.Path(original_file_name).suffix

    return f"{uuid4().hex}{extension}"


def file_generate_local_upload_url(*, file_id: str):
    url = reverse(
        "fileupload:local",
        kwargs={"file_id": file_id}
    )

    return f"{settings.APP_DOMAIN}{url}"


class File(models.Model):
    file = models.FileField(
        upload_to=file_generate_upload_path,
        blank=True,
        null=True
    )

    original_file_name = models.TextField()

    file_name = models.CharField(max_length=255, unique=True)
    file_type = models.CharField(max_length=255)

    upload_finished_at = models.DateTimeField(blank=True, null=True)

    @property
    def is_valid(self):
        """
        We consider a file "valid" if the the datetime flag has value.
        """
        return bool(self.upload_finished_at)

    @property
    def url(self):
        if settings.FILE_UPLOAD_STORAGE == "s3":
            return self.file.url

        return f"{settings.APP_DOMAIN}{self.file.url}"