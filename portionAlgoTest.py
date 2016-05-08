import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ketoMon.settings")
import django
django.setup()
import json

from ketoBot.models import Recipe, Recipe_Nutrition
from ketoBot.serializers import RecipeSerializer, RecipeNutritionSerializer

staples = Recipe.objects.filter(staple=True)
stapleSerializer = RecipeSerializer(staples, many=True)

stapleID = [int(x['id']) for x in stapleSerializer.data]    
gotStapleNutrition = Recipe_Nutrition.objects.filter(r__in=stapleID)

nutri = RecipeNutritionSerializer(gotStapleNutrition, many=True)

matrixPro = []
matrixFat = []
matrixCarb = []

#This will create the set of matrices to plug into numpy
#Input, the set of ordered dicts
for i, x in enumerate(nutri.data):
  for key, value in x.iteritems():
    if key == "protein":
      matrixPro.append(value)
    elif key == "fat":
      matrixFat.append(value)
    elif key == "net_carb":
      matrixCarb.append(value)

print(matrixPro)

import numpy as np


pro = [4,5]
fat = [1,2]
carb = [3,6]

A = np.array((pro, fat, carb))
b = np.array([22,7,21])


#this will round. necessary for returning approximate solution
print(np.linalg.lstsq(A, b))

#Finds A solution, but not integer solutions

# from itertools import combinations

# arr = [1,2,3]

# def makeCombos(arr):
#   return (sum([map(list, combinations(arr, i)) for i in range(len(arr) + 1)], []))

# def testCombos(arr):
#   for x,i in enumerate(makeCombos(arr)):
#     #transform data into usable matrix form
  
# testCombos(arr)








