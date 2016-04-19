from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.http import Http404

import requests
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes

from django.core.cache import cache

from ketoBot.serializers import RecipeSerializer, IngredientSerializer, RecipeNutritionSerializer
from .models import Recipe, Ingredient, Recipe_Nutrition

@api_view(['GET', 'POST'])
def recipe_list(request):
    if request.method == 'GET':
      if cache.get("recipeCache"):
        serializer = RecipeSerializer(cache.get("recipeCache"), many=True)                
        return Response(serializer.data)
      else:
        latest_recipes = Recipe.objects.order_by('?').exclude(time='Dinner')[:20]
        cache.set("recipeCache", latest_recipes, timeout=10800)        
        serializer = RecipeSerializer(latest_recipes, many=True)                
        return Response(serializer.data)
    
    elif request.method == 'POST':
      serializer = RecipeSerializer(data=request.DATA)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(
          serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def recipe_nutrition(request):
  # requestedRecipes = 
  # serializer = RecipeNutritionSerializer(requestedRecipes, many=True)        
    splitStrip = filter(None, request.query_params['ids'].strip().split(','))
    recipeIds = [int(numeric_string) for numeric_string in splitStrip]    
    gotRecipeNutrition = Recipe_Nutrition.objects.filter(r__in=recipeIds)
    serializer = RecipeNutritionSerializer(gotRecipeNutrition, many=True)
    return Response(serializer.data)  


#This is for ElasticSearch
@api_view(['GET', 'POST'])
def search(request):
  searchData = json.loads(request.body)
  userPref = {
    'want': searchData['want'] or "",
    'noWant': searchData['noWant'] or ""
  }
  
  data = {
     "_source": ["id"],
     "query": {
      "filtered": {
         "query": {
            "match": {
               "title": userPref['want']
            }
         },
         "filter": {
            "not": {
               "term": {
                  "ingredients": userPref['noWant']
               }
            }
         },  
       }
     }
  }
  response = requests.post("http://localhost:9200/recipes/_search", data=json.dumps(data))
  return Response(response.json())
    

@api_view(['GET', 'PUT', 'DELETE'])
def recipe_detail(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    ingredients = Ingredient.objects.filter(r=pk)
    serializer = IngredientSerializer(ingredients, many=True)
    return Response(serializer.data)

## latest_recipes = Recipe.objects.order_by('-recipe_title')[:10]
      # context = {
      #   'latest_recipes': latest_recipes,
      # }    
      # return render(request, 'ketoBot/index.html', context)

def reactApp(request):    
    return render(request, 'ketoBot/index.html')
