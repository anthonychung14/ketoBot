import sys
djangoPath = '/Users/ACKeepingitCoo/Desktop/ketoBot'
sys.path.append(djangoPath)

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ketoMon.settings")
import django
django.setup()

import numpy as np
from itertools import combinations

from ketoBot.models import Recipe, Recipe_Nutrition
from ketoBot.serializers import RecipeSerializer, RecipeNutritionSerializer

from fridge.models import FridgeItem
from fridge.serializers import FridgeItemSerializer

#Grab necessary items
staples = Recipe.objects.filter(staple=True)
stapleSerializer = RecipeSerializer(staples, many=True)
stapleID = [int(x['id']) for x in stapleSerializer.data]    
gotStapleNutrition = Recipe_Nutrition.objects.filter(r__in=stapleID)
nutri = RecipeNutritionSerializer(gotStapleNutrition, many=True)

fridgeItems = FridgeItem.objects.all()
fridgeSerial = FridgeItemSerializer(fridgeItems, many=True)

#Generate all combos
def makeCombos(arr):
  return (sum([map(list, combinations(arr, i)) for i in range(len(arr) + 1)], []))

#TEST #1 - you are outputting all possible combos of staples, not their ingredients
def calcMacros(foodDataObj):
  for key in foodDataObj['totalMacros']:
    foodDataObj['totalMacros'][key] += foodDataObj['baseMacros'][key] * foodDataObj['servings']
  return foodDataObj

def makeCalcDictionary(arr):  
  finalResult = []
  for i, combo in enumerate(makeCombos(arr)):    
    #we are within each combo of ordered dicts, the next step is to transform them into pfc matrices
    combinationResult = []    
    #iterate through combo orderedDict
    #each staple needs an identifier so I can trace back the item information
    
    for j, staple in enumerate(combo):                        
      def makeNewData(staple):
        foodData = {
          'id': staple['r'],
          'baseMacros': {
            'protein': staple['protein'],
            'fat': staple['fat'],
            'carbs': staple['net_carb']
            },
          'totalMacros': {
            'protein': 0,
            'fat': 0,
            'carbs': 0
          },
          'servings': 1
        }        
        return foodData
      newMacros = calcMacros(makeNewData(staple))
      combinationResult.append(newMacros)                            
    finalResult.append(combinationResult)
  return finalResult;

def createSumDict(dictCombos):
  #sum all macros in combination. store this in a data struct you hold alongside
  totalSums = {}
  countIdx = 0
  for combo in dictCombos:
    totalSums[countIdx] = {
      'protein': 0,
      'fat': 0,
      'carbs': 0
    }
    
    for item in combo:      
      totalSums[countIdx]['protein'] += item['totalMacros']['protein']
      totalSums[countIdx]['fat'] += item['totalMacros']['fat']
      totalSums[countIdx]['carbs'] += item['totalMacros']['carbs']
    countIdx += 1
  return totalSums

#Dictionary, Target, Total Hash
testDict = makeCalcDictionary(nutri.data)[1:10]
testTarget = {
  'targetMacros': {
      'protein': 0,
      'fat': 0,
      'carbs': 0
  },
  'minDiff': { 
      'protein': 0,
      'fat': 0,
      'carbs': 0
    }
  }

testTotals = createSumDict(testDict)

#Checks the totals dict against target
#Should be invoked everytime testTotals is updated
#If true, all good. if false, Deal with the individual
def checkTargets(totals, target):
  for key in totals:
    for nestedKey in totals[key]:    
      #If any of the total macros are greater than the target, say something
      if any(totals[key][nestedKey] > target['targetMacros'][nestedKey] for nestedKey in totals[key]):
        ##Adjust the servings down
        # key == combination number, so you'd look it up in the testDict array - 1                
        # print(totals[key][nestedKey], target['targetMacros'][nestedKey], testDict[key])
        for x in testDict[key]:
          print(x['totalMacros'], key)
  return

  
checkTargets(testTotals, testTarget)


