# Generated by Django 4.0.2 on 2022-09-21 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agent', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agentinformation',
            name='agent_address',
        ),
        migrations.RemoveField(
            model_name='agentinformation',
            name='agent_first_name',
        ),
        migrations.RemoveField(
            model_name='agentinformation',
            name='agent_last_name',
        ),
        migrations.RemoveField(
            model_name='agentinformation',
            name='agent_mobile_no',
        ),
        migrations.AddField(
            model_name='agentinformation',
            name='city',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='agentinformation',
            name='mobile_number',
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='agentinformation',
            name='organization_name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='agentinformation',
            name='pancard_number',
            field=models.CharField(max_length=50, null=True),
        ),
    ]