# Generated by Django 3.0 on 2020-10-11 15:07

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='avatar'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='telephone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None, verbose_name='phone number'),
        ),
    ]
