# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-29 15:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ketoBot', '0003_auto_20160425_2205'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='staple',
            field=models.BooleanField(default=False),
        ),
    ]