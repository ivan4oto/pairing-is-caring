# Generated by Django 4.1 on 2022-11-22 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pairingsession',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='pairingsession',
            name='title',
            field=models.CharField(default='Title', max_length=50),
        ),
    ]
