# Generated by Django 4.0.2 on 2022-04-28 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_rename_first_name_userinfo_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='ticket_number',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='ticket_number',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
