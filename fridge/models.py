from __future__ import unicode_literals

from django.db import models

class FridgeItem(models.Model):
  name = models.CharField(max_length=200)
  category = models.CharField(max_length=200)
  amount = models.IntegerField(default=0)  
  measurement = models.CharField(max_length=200)
  servings = models.IntegerField(default=0)
  calories = models.IntegerField(default=0)
  protein = models.IntegerField(default=0)
  fat = models.IntegerField(default=0)
  carbs = models.IntegerField(default=0)
  fiber = models.IntegerField(default=0)

class FridgeFill(models.Model):  
  r = models.ForeignKey(FridgeItem, on_delete=models.CASCADE)
  servings = models.IntegerField(default=1)
  calories = models.IntegerField(default=0)
  protein = models.IntegerField(default=0)
  fat = models.IntegerField(default=0)
  carbs = models.IntegerField(default=0)



