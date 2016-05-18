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

from .models import FridgeItem
from ketoBot.models import Recipe, Recipe_Nutrition
from ketoBot.serializers import RecipeSerializer, RecipeNutritionSerializer

from fridge.serializers import FridgeItemSerializer, FridgeFillSerializer
from portionAlgo.FindSolution import FindTenSols

@api_view(['GET', 'POST'])
def portionAlgo(request):
  if request.method == 'POST':        
    print(request.body)
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
        print(serial.data['name'])
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


@api_view(['GET', 'POST'])
def mealPlanMagic(request):
  if request.method == 'GET':
    #Reach into the DB and go get it
    print("hi")


  elif request.method == 'POST':
    ##get data, serialize, and then post it son
    print("bye")


@api_view(['GET', 'POST'])
def fridge(request):
  if request.method == 'GET':    
    allItems = FridgeItem.objects.all()
    itemSerializer = FridgeItemSerializer(allItems, many=True)
    return Response(itemSerializer.data)
    
  elif request.method == 'POST':
    serializer = FridgeItemSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)    
    else:
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
     
    

