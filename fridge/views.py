import requests
import json

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

from fridge.serializers import FridgeItemSerializer

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
  print(request.body, "BODY")

  if request.method == 'POST':
    data = {    
     "query": {
        "query_string": {
          "query": "'ground beef' OR 'coconut oil' OR 'paneer'"
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
     
    

