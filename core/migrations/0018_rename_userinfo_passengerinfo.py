# Generated by Django 4.0.2 on 2022-09-20 07:56

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0017_seat_trip_schedule_id'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserInfo',
            new_name='PassengerInfo',
        ),
    ]