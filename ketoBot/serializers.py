from rest_framework import serializers
from models import Ingredient, Recipe, Recipe_Nutrition
      
class RecipeSerializer(serializers.ModelSerializer):        
    class Meta:
      model = Recipe
      fields = ('id', 'title', 'date', 'time', 'image')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
      model = Ingredient
      fields = ('amount', 'measurement', 'name')

class RecipeNutritionSerializer(serializers.ModelSerializer):
    class Meta:
      model = Recipe_Nutrition
      fields = ('r', 'servings', 'calories', 'net_carb', 'fat', 'protein')
