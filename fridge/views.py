import requests
import json

import sys
path = "/Users/ACKeepingitCoo/Desktop/ketoBot/portionAlgo"
sys.path.append(path)

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.http import Http404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes

from django.core.cache import cache

from .models import FridgeItem, MealPlan, MealPlanItem, FridgeInventory
from ketoBot.models import Recipe, Recipe_Nutrition, Ingredient
from ketoBot.serializers import RecipeSerializer, RecipeNutritionSerializer, IngredientSerializer
from fridge.serializers import FridgeItemSerializer, FridgeFillSerializer, MealPlanSerializer, MealPlanItemSerializer, FridgeInventorySerializer

from portionAlgo.FindSolution import FindTenSols

##### ROUTE FOR PORTION ALGORITHM ######
@api_view(['GET', 'POST'])
def portionAlgo(request):
  if request.method == 'POST':          
    remaining = json.loads(request.body)
    target = {
      'protein': remaining['Protein'],
      'fat': remaining['Fat'],
      'carbs': remaining['Carbs']
    }
    
    fridgeItems = FridgeItem.objects.all()
    fridgeSerial = FridgeItemSerializer(fridgeItems, many=True)    
    result = FindTenSols(fridgeSerial.data, target)

    data = []
    for i, combo in enumerate(result):
      comboResult = {
        'totals': combo.totals,
        'calories': combo.totals['protein']*4 + combo.totals['carbs']*4 + combo.totals['fat']*9,
        'diff': combo.diff,
        'items': []
      }
      for item in combo.staples:
        lookupName = FridgeItem.objects.get(pk=item.id)
        serial = FridgeItemSerializer(lookupName)
        fridgeItem = {
          'id': item.id,
          'name': serial.data['name'],
          'protein': item.totals['protein'],
          'fat': item.totals['fat'],
          'carbs': item.totals['carbs'],
          'servings': item.servings
        }
        comboResult['items'].append(fridgeItem)

      data.append(comboResult)    
      
    return Response(data)

########## MEAL PLAN #############
@api_view(['GET', 'POST'])
def makePlan(request):
  if request.method == 'GET':    
    fetchMealPlans = MealPlan.objects.all()[:5]
    gotMealPlans = MealPlanSerializer(fetchMealPlans, many=True)
    return Response(gotMealPlans.data)

  
  elif request.method == 'POST':
    totalData = request.data['finalMeal']
    totalItems = []    
    totalSerial = MealPlanSerializer(data=request.data['finalMeal'])

    if totalSerial.is_valid():
      savedTotal = totalSerial.save()
      savedTotalId = savedTotal.id      
    else:
      print('serialization failed')
      return Response(totalSerial.errors, status=status.HTTP_400_BAD_REQUEST)

    ## SUBTRACTION and DB POSTING LOGIC ##    
    inventory = []
    for item in request.data['finalMealItems']:      
      itemData = {
        'name': item['name'],
        'mealPlanRef': savedTotalId,
        'typeof': item['typeof'],
        'servings': item['servings'],
        'calories': item['calories'],
        'carbs': item['carbs'],
        'protein': item['protein'],
        'fat': item['fat'],
        'eaten': False,
      }
      
      if item['typeof'] == 'algoFridge' or item['typeof'] == 'userFridge':
        servings = item['servings']            
        itemData['fridgeRef'] = item['foreignKey']
        itemSerializer = MealPlanItemSerializer(data=itemData)        
        
        if itemSerializer.is_valid():
          savedItem = itemSerializer.save()
        else:
          print("serialization of fridge item failed")
          return Response(itemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        
        for item in range(0, servings):                  
          fridgeItem = FridgeItem.objects.get(pk=itemData['fridgeRef'])
          inventory.append(FridgeInventory(fridgeItem=fridgeItem, eaten=True))
        
      elif item['typeof'] == 'userStaple':
        servings = item['servings']            
        itemData['recipeRef'] = item['foreignKey']        
        itemSerializer = MealPlanItemSerializer(data=itemData)
        
        if itemSerializer.is_valid():
          savedItem = itemSerializer.save()
        else:
          print("serialization of fridge item failed")
          return Response(itemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)        

        for item in Ingredient.objects.filter(r_id=itemData['recipeRef']):          
          ingred = IngredientSerializer(item)
          totalServings = int(ingred.data['amount'] * servings)

          for num in range(0, totalServings):                                  
            gotItem = FridgeItem.objects.get(name=ingred['name'].value)            
            inventory.append(FridgeInventory(fridgeItem=gotItem, eaten=True))

    FridgeInventory.objects.bulk_create(inventory)    
    return Response(request.data['finalMeal'])

####### POST FRIDGE ITEMS TO DB #######
@api_view(['GET', 'POST'])
def fridge(request):
  if request.method == 'GET':    
    # for row in FridgeItem.objects.all():
    #   if FridgeItem.objects.filter(name=row.name).count() > 1:
    #     row.delete()

    allItems = FridgeItem.objects.all()
    itemSerializer = FridgeItemSerializer(allItems, many=True)
    
    for item in itemSerializer.data:
      avail = FridgeInventory.objects.filter(fridgeItem=item['id'], eaten=False).count()
      eaten = FridgeInventory.objects.filter(fridgeItem=item['id'], eaten=True).count()
      total = avail - eaten
      item['servings'] = avail - eaten
      FridgeItem.objects.filter(pk=item['id']).update(servings=total)

    updated = FridgeItem.objects.all()
    updatedSerializer = FridgeItemSerializer(updated, many=True)
    return Response(itemSerializer.data)
    
  elif request.method == 'POST':
    serializer = FridgeItemSerializer(data = request.data)    
    inventory = []
    
    if serializer.is_valid():
      fridgefk = serializer.save()
      servings = serializer.data['servings']      
      for item in range(0, servings):        
        inventory.append(FridgeInventory(fridgeItem=fridgefk, eaten=False))      
      FridgeInventory.objects.bulk_create(inventory)        
      return Response(serializer.data, status=status.HTTP_201_CREATED)    
    else:
      print(serializer, serializer.data, "not valid")
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def search(request):
  queryJSON = json.loads(request.body)
  #if one long, transform into string
  #if more than two, put an OR between all of them  
  def makeQuery(queryClient):
    string = ""
    if len(queryClient) != 0:
      for x in queryClient[:-1]:
        if len(queryClient) > 1:
          string += x + " OR "
        else: 
          string += x
      string  += queryClient[-1]
      return string
    else: 
      return string


  if request.method == 'POST':
    data = {    
     "query": {
        "query_string": {
          "query": makeQuery(queryJSON)
        }
      }
    }
    response = requests.post("http://localhost:9200/recipes/_search", data=json.dumps(data))
    elasticJSON = response.json()['hits']['hits']  
    searchIDs = [ x['_source']['id'] for x in elasticJSON ]

    gotSearchRecipe = Recipe.objects.filter(pk__in=searchIDs)
    gotSearchNutrition = Recipe_Nutrition.objects.filter(r__in=searchIDs)

    serializerRecipe = RecipeSerializer(gotSearchRecipe, many=True)
    serializerNutrition = RecipeNutritionSerializer(gotSearchNutrition, many=True)

    data = {
      'searchRecipe': serializerRecipe.data,
      'searchNutrition': serializerNutrition.data
    }

    return Response(data)  
     
    

