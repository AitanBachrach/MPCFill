# Generated by Django 3.2.4 on 2021-06-12 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cardpicker", "0013_alter_source_drive_link"),
    ]

    operations = [
        migrations.AlterField(
            model_name="source",
            name="drive_id",
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name="source",
            name="drive_link",
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
