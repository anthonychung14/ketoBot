from __future__ import unicode_literals

from django.db import models
from ketoBot.models import Recipe

class UserAuth(models.Model):
  name= models.CharField(max_length=200)

class UserChoose(models.Model):
  user = models.ForeignKey(UserAuth, on_delete=models.CASCADE)
  r = models.ForeignKey(Recipe, on_delete=models.CASCADE)
  eatAgain = models.BooleanField()

class UserNutrition(models.Model):
  user = models.ForeignKey(UserAuth, on_delete=models.CASCADE)


