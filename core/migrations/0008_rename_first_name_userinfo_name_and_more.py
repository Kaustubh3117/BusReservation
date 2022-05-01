# Generated by Django 4.0.2 on 2022-02-28 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_tripschedule_bus_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userinfo',
            old_name='first_name',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='userinfo',
            name='last_name',
        ),
        migrations.AddField(
            model_name='userinfo',
            name='age',
            field=models.IntegerField(default=123),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userinfo',
            name='gender',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]