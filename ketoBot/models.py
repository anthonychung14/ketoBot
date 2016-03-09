from __future__ import unicode_literals

from django.db import models

class Recipe(models.Model):
    recipe_title = models.CharField(max_length=200)
    recipe_type = (
      ('B', 'Breakfast'),
      ('L', 'Lunch'),
      ('D', 'Dinner'),
      ('Dst', 'Dessert'),
      ('S', 'Snack')
    )
    recipe_date = models.DateTimeField('date published')
    recipe_picture = models.CharField(max_length=200)

class Recipe_Nutrition (models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    calories = models.IntegerField(default=0)
    protein = models.IntegerField(default=0)
    fat = models.IntegerField(default=0)
    net_carb = models.IntegerField(default=0)
    carb = models.IntegerField(default=0)
    fiber = models.IntegerField(default=0)

class Recipe_Directions (models.Model):    
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    direction_step = models.CharField(max_length=200)
    direction_picture = models.CharField(max_length=200)

class Ingredient (models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    amount = models.IntegerField(default = 0)
    measurement = models.CharField(max_length=200)
    name = models.CharField(max_length=200)    

class Ingred_Nutrition (models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    calories = models.IntegerField(default=0)
    protein = models.IntegerField(default=0)
    fat = models.IntegerField(default=0)
    net_carb = models.IntegerField(default=0)
    carb = models.IntegerField(default=0)
    fiber = models.IntegerField(default=0)    

