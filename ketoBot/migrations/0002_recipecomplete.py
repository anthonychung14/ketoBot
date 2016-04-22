# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-21 15:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ketoBot', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecipeComplete',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('date', models.CharField(max_length=200)),
                ('time', models.CharField(max_length=200)),
                ('image', models.CharField(max_length=200)),
                ('servings', models.IntegerField(default=0)),
                ('calories', models.IntegerField(default=0)),
                ('fat', models.IntegerField(default=0)),
                ('carb', models.IntegerField(default=0)),
                ('fiber', models.IntegerField(default=0)),
                ('net_carb', models.IntegerField(default=0)),
                ('protein', models.IntegerField(default=0)),
            ],
        ),
    ]
