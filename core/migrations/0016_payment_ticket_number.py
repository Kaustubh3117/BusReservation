# Generated by Django 4.0.2 on 2022-08-20 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_alter_payment_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='ticket_number',
            field=models.CharField(max_length=100, null=True),
        ),
    ]