# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-25 22:05
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ketoBot', '0002_recipecomplete'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe_directions',
            name='r',
        ),
        migrations.DeleteModel(
            name='RecipeComplete',
        ),
        migrations.DeleteModel(
            name='Recipe_Directions',
        ),
    ]