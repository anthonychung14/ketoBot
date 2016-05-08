import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ketoMon.settings")

import django
django.setup()

import numpy as np
from itertools import combinations

from ketoBot.models import Recipe, Recipe_Nutrition
from ketoBot.serializers import RecipeSerializer, RecipeNutritionSerializer

#Grab necessary items
staples = Recipe.objects.filter(staple=True)
stapleSerializer = RecipeSerializer(staples, many=True)

stapleID = [int(x['id']) for x in stapleSerializer.data]    
gotStapleNutrition = Recipe_Nutrition.objects.filter(r__in=stapleID)

nutri = RecipeNutritionSerializer(gotStapleNutrition, many=True)

#Generate all combos
def makeCombos(arr):
  return (sum([map(list, combinations(arr, i)) for i in range(len(arr) + 1)], []))

#TEST #1 - you are outputting all possible combos
arr = [1,2,3,4]
print(len(makeCombos(arr)))

#Format the data within each of these combos
def makeComboDictionary(arr):
  finalResult = []
  for i, combo in enumerate(makeCombos(arr)):
    #transform data into usable matrix form
    #we are within each combo of ordered dicts, the next step is to transform them into pfc matrices
    combinationResult = []
    #ideally, these would be generators to save memory, but let's do it brute force first
    
    #iterate through combo orderedDict
    #each staple needs an identifier so I can trace back the item information
    for j, staple in enumerate(combo):            
      mPro = []
      mFat = []
      mCarb = []
      for key, value in staple.iteritems():
        if key == "protein":
          mPro.append(value)
        elif key == "fat":
          mFat.append(value)
        elif key == "net_carb":
          mCarb.append(value)
        elif key == "r":
          id = value
      combinationResult.append({id: mPro + mFat + mCarb})
    finalResult.append(combinationResult)

  return finalResult;

# print(makeComboDictionary(nutri.data[0:3]))

#takes an array of dictionaries and a target vector
def generateComboMatrix(arrDicts):
  #make a hash map of the ids that map the ids to the array location
  totalCombos = []
  #i = combination #, comboArray =orderedDictionary
  for i, comboArray in enumerate(arrDicts):
    comboMap = []
    comboMatrix = []

    protein = [d.values()[0][0] for d in comboArray]
    fats = [d.values()[0][1] for d in comboArray]
    carbs = [d.values()[0][2] for d in comboArray]

    comboMatrix.append(protein)
    comboMatrix.append(fats)
    comboMatrix.append(carbs)    
    
    for index, idHash in enumerate(comboArray):
      indexMap = {}      
      for key, item in idHash.iteritems():                        
        indexMap[key] = index            
      comboMap.append(indexMap)            
    
    totalCombos.append(comboMatrix)  
  print(totalCombos, "hoopla")
  return totalCombos

def generateComboMap(arrDicts):
  #make a hash map of the ids that map the ids to the array location
  totalCombos = []
  #i = combination #, comboArray =orderedDictionary
  for i, comboArray in enumerate(arrDicts):
    comboMap = []    

    for index, idHash in enumerate(comboArray):
      indexMap = {}      
      for key, item in idHash.iteritems():                        
        indexMap[key] = index            
      comboMap.append(indexMap)            
    
    totalCombos.append(comboMap)  
  return totalCombos


    
  #construct new pro/fat/carb matrices with the matrices you have


  #feed them into num pee
  #returns a new array of dictionaries with the same keys, but values within each array are integer servings

generateComboMatrix(makeComboDictionary(nutri.data[0:4]), 0)

#This will be created for every combination


#This will create the set of matrices to plug into numpy
#Input, the set of ordered dicts


#Example of how to solve/test each combination
pro = [4,5]
fat = [1,2]
carb = [3,6]

A = np.array((pro, fat, carb))
b = np.array([22,7,21])

#this will round. necessary for returning approximate solution
# print(np.linalg.lstsq(A, b))

#Finds A solution, but not integer solutions



# arr = [1,2,3]








