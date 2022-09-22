# Generated by Django 4.0.2 on 2022-09-21 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_useraccount_is_agent'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='city',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='mobile_number',
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='organization_name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='pancard_number',
            field=models.CharField(max_length=50, null=True),
        ),
    ]