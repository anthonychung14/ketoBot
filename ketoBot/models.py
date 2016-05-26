from __future__ import unicode_literals

from django.db import models

#Recipe object in ES => Provides recommendations for initial fit
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    time = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    staple = models.BooleanField(default=False)    

class Recipe_Nutrition(models.Model):    
    r = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    servings = models.IntegerField(default=0)
    calories = models.IntegerField(default=0)
    fat = models.IntegerField(default=0)
    carb = models.IntegerField(default=0)
    fiber = models.IntegerField(default=0)
    net_carb = models.IntegerField(default=0)
    protein = models.IntegerField(default=0)

#Ingredient object in ES => Enough data for NLP, feedback, regressions on certain ingredients?
class Ingredient (models.Model):
    r = models.ForeignKey(Recipe, on_delete=models.CASCADE)    
    rawString = models.CharField(max_length=200)
    amount = models.FloatField(default = 0)
    measurement = models.CharField(max_length=200)
    name = models.CharField(max_length=200)    

class Ingred_Nutrition (models.Model):
    i = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    calories = models.IntegerField(default=0)
    protein = models.IntegerField(default=0)
    fat = models.IntegerField(default=0)
    net_carb = models.IntegerField(default=0)
    carb = models.IntegerField(default=0)
    fiber = models.IntegerField(default=0)    

