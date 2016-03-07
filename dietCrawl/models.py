from __future__ import unicode_literals

from django.db import models

class Recipe(models.Model):
    recipe_title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class User(models.Model):
    userName = models.CharField(max_length=200)
    
class Choice(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

