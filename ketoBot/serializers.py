from rest_framework import serializers, viewsets
from models import Ingredient, Recipe, Recipe_Nutrition, Ingred_Nutrition
      
class RecipeSerializer(serializers.ModelSerializer):        
    class Meta:
      model = Recipe
      fields = ('id', 'title', 'date', 'time', 'image', 'staple')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
      model = Ingredient
      fields = ('r', 'amount', 'measurement', 'name', 'rawString')

class RecipeNutritionSerializer(serializers.ModelSerializer):
    class Meta:
      model = Recipe_Nutrition
      fields = ('r', 'servings', 'calories', 'net_carb', 'fat', 'protein')

class IngredNutritionSerializer(serializers.ModelSerializer):
    class Meta:
      model = Ingred_Nutrition
      fields = ('i', 'calories', 'protein', 'fat', 'net_carb', 'carb', 'fiber')