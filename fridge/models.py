from __future__ import unicode_literals

from django.db import models

class FridgeItem(models.Model):
  title = models.CharField(max_length=200)
  category = models.CharField(max_length=200)
  amount = models.IntegerField(default=0)
  measurement = models.CharField(max_length=200)

class ItemNutrition(models.Model):
  i = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
  calories = models.IntegerField(default=0)
  protein = models.IntegerField(default=0)
  fat = models.IntegerField(default=0)
  net_carb = models.IntegerField(default=0)
  carb = models.IntegerField(default=0)
  fiber = models.IntegerField(default=0) 



