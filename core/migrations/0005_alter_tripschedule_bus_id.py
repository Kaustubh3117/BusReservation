# Generated by Django 4.0.2 on 2022-02-11 06:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_boardingpoint_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tripschedule',
            name='bus_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bus_id', to='core.bus'),
        ),
    ]