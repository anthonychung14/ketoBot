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

from ketoBot.serializers import RecipeSerializer, IngredientSerializer, RecipeNutritionSerializer, IngredNutritionSerializer
from .models import Recipe, Ingredient, Recipe_Nutrition, Ingred_Nutrition

@api_view(['GET', 'POST'])
def staples(request):
  if request.method == 'GET':
    #return the list of cards pl0x
    staples = Recipe.objects.filter(staple=True)    
    stapleSerializer = RecipeSerializer(staples, many=True)

    stapleID = [int(x['id']) for x in stapleSerializer.data]    

    gotStapleNutrition = Recipe_Nutrition.objects.filter(r__in=stapleID)
    nutritionSerializer = RecipeNutritionSerializer(gotStapleNutrition, many=True)
    
    gotStapleIngredients = Ingredient.objects.filter(r__in=stapleID)    
    ingredientSerializer = IngredientSerializer(gotStapleIngredients, many=True)
    
    data = {
      'stapleData': stapleSerializer.data,
      'stapleNutrition': nutritionSerializer.data,
      'stapleIngredients': ingredientSerializer.data
    }

    return Response(data)

#Caching opportunities

#1. cache the results of database
#2. LRU cache of the most recently used items in your staples
#3. Recommended items to buy for the fridge
#4. Figure out how to cascade delete the recipes that are faulty (no ingredient data)        
#5. Don't render amount/servings on the front-end, pass in the string itself

@api_view(['GET', 'POST'])
def recipe_list(request):
    if request.method == 'GET':
      if cache.get("recipeCache"):
        serializer = RecipeSerializer(cache.get("recipeCache"), many=True)                
        return Response(serializer.data)
      else:
        latest_recipes = Recipe.objects.filter(staple=False).order_by('?')[:40]
        cache.set("recipeCache", latest_recipes, timeout=1800)
        serializer = RecipeSerializer(latest_recipes, many=True)        
              
      return Response(serializer.data)
    
    elif request.method == 'POST':
      #split the data into three parts. each one will have to be serialized and saved
      rKey = ""
      def error(serializer):
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
      tripleDecode = json.loads(request.body)
      recipeData = tripleDecode["recipe"]
      recipeNutrition = tripleDecode['nutrition']
      
      #This will need to be decoded further
      recipeIngred = tripleDecode['ingreds']
      
      recSerializer = RecipeSerializer(data=recipeData)
      if recSerializer.is_valid():        
        saved = recSerializer.save()
        rKey = saved.id
      else:
        error(recSerializer)

      recipeNutrition['r'] = rKey
      recNutriSerializer = RecipeNutritionSerializer(data=recipeNutrition)      
      if recNutriSerializer.is_valid():        
        recNutriSerializer.save()
      else:
        error(recNutriSerializer)
      
      # for each item in the recipeIngred array, we need to create a new dictionary      
      def splitIngreds(obj):
        recipeIngred = {
          'r': rKey,
          'amount':  obj['servings'],
          'measurement': obj['measurement'],
          'name': obj['name'],          
        }

        ingredSerializer = IngredientSerializer(data=recipeIngred)        
        
        if ingredSerializer.is_valid():
          savedIngred = ingredSerializer.save()
          iKey = savedIngred.id
        else:
          print("ERROR in INGREDSERIALIZER BROH")

        ingredNutri = {
          'i': iKey,
          'calories': obj['calories'],
          'protein': obj['protein'],
          'fat': obj['fat'],
          'net_carb': obj['carbs'] - obj['fiber'],
          'carb': obj['carbs'],
          'fiber': obj['fiber']
        }
        ingredNutriSerializer = IngredNutritionSerializer(data=ingredNutri)

        if ingredNutriSerializer.is_valid():
          ingredNutriSerializer.save()
        else:
          print("ERROR in ingredNutriSerializer")

      [splitIngreds(x) for x in recipeIngred]      

      return Response(recSerializer.data)

@api_view(['GET'])
def recipe_nutrition(request):
  # requestedRecipes = 
  # serializer = RecipeNutritionSerializer(requestedRecipes, many=True)        
    splitStrip = filter(None, request.query_params['ids'].strip().split(','))
    recipeIds = [int(numeric_string) for numeric_string in splitStrip]

    gotRecipeNutrition = Recipe_Nutrition.objects.filter(r__in=recipeIds)
    nutritionSerializer = RecipeNutritionSerializer(gotRecipeNutrition, many=True)
    
    gotRecipeIngredients = Ingredient.objects.filter(r__in=recipeIds)    
    ingredientSerializer = IngredientSerializer(gotRecipeIngredients, many=True)
    
    data = {
      'nutrition': nutritionSerializer.data,
      'ingredients': ingredientSerializer.data
    }

    return Response(data)  

#This is for ElasticSearch
@api_view(['GET', 'POST'])
def search(request):
  searchData = json.loads(request.body)  
  decodedData = json.loads(searchData['data'])

  data = {
    "_source": ["id"],
     "query": {
      "filtered": {
         "query": {
            "match": {
               "title": decodedData.get('want', '') or ''
            }
         },
         "filter": {
            "not": {
               "term": {
                  "ingredients": decodedData.get('noWant', '') or ''
               }
            }
         },  
       }
     }
  }
  response = requests.post("http://localhost:9200/recipes/_search", data=json.dumps(data))  
  
  elasticJSON = response.json()['hits']['hits']  
  searchIDs = [ x['_source']['id'] for x in elasticJSON ]

  gotSearchRecipe = Recipe.objects.filter(pk__in=searchIDs)
  gotSearchNutrition = Recipe_Nutrition.objects.filter(r__in=searchIDs)
  gotRecipeIngredients = Ingredient.objects.filter(r__in=searchIDs)    

  serializerRecipe = RecipeSerializer(gotSearchRecipe, many=True)
  serializerNutrition = RecipeNutritionSerializer(gotSearchNutrition, many=True)
  serializerIngredient = IngredientSerializer(gotRecipeIngredients, many=True)
    
  data = {
    'searchRecipe': serializerRecipe.data,
    'searchNutrition': serializerNutrition.data,
    'searchIngredients': serializerIngredient.data
  }

  return Response(data)  
    

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
