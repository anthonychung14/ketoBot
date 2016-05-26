from __future__ import unicode_literals

from django.db import models
from ketoBot.models import Recipe

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

class FridgeInventory(models.Model):
  fridgeItem = models.ForeignKey(FridgeItem, on_delete=models.CASCADE)
  eaten = models.BooleanField(default=False)

class FridgeFill(models.Model):  
  r = models.ForeignKey(FridgeItem, on_delete=models.CASCADE)
  servings = models.IntegerField(default=1)
  calories = models.IntegerField(default=0)
  protein = models.IntegerField(default=0)
  fat = models.IntegerField(default=0)
  carbs = models.IntegerField(default=0)

class MealPlan(models.Model):
  date = models.CharField(max_length=200)
  calories = models.IntegerField(default=0)
  protein = models.IntegerField(default=0)
  carbs = models.IntegerField(default=0)
  fat = models.IntegerField(default=0)
  eaten = models.IntegerField(default=0)

class MealPlanItem(models.Model):
  name = models.CharField(max_length=200)
  mealPlanRef = models.ForeignKey(MealPlan, on_delete=models.CASCADE)
  typeof = models.CharField(max_length=200)
  recipeRef = models.ForeignKey(Recipe, on_delete=models.CASCADE, default='', null=True)
  fridgeRef = models.ForeignKey(FridgeItem, on_delete=models.CASCADE, default='', null=True)
  servings = models.IntegerField(default=0)
  calories = models.IntegerField(default=0)
  protein = models.IntegerField(default=0)
  carbs = models.IntegerField(default=0)
  fat = models.IntegerField(default=0)
  eaten = models.BooleanField(default=False)



