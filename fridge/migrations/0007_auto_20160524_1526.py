# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-24 15:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fridge', '0006_auto_20160524_1500'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mealplan',
            old_name='adherence',
            new_name='eaten',
        ),
    ]