# Generated by Django 4.0.2 on 2022-02-10 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_remove_tripschedule_trip_schedule_agent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boardingpoint',
            name='price',
        ),
    ]
