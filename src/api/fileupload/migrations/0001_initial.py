# Generated by Django 4.1 on 2022-10-21 19:10

from django.db import migrations, models
import fileupload.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=fileupload.models.file_generate_upload_path)),
                ('original_file_name', models.TextField()),
                ('file_name', models.CharField(max_length=255, unique=True)),
                ('file_type', models.CharField(max_length=255)),
                ('upload_finished_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]