# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-24 15:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fridge', '0005_auto_20160524_1459'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mealplanitem',
            name='fridgeRef',
            field=models.ForeignKey(default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='fridge.FridgeItem'),
        ),
        migrations.AlterField(
            model_name='mealplanitem',
            name='recipeRef',
            field=models.ForeignKey(default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='ketoBot.Recipe'),
        ),
    ]