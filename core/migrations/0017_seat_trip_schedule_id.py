# Generated by Django 4.0.2 on 2022-09-19 08:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_payment_ticket_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='trip_schedule_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.tripschedule'),
        ),
    ]
