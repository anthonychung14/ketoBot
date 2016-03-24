from rest_framework import serializers
from models import Ingredient, Recipe

class RecipeSerializer(serializers.ModelSerializer):    
    class Meta:
      model = Recipe
      fields = ('title', 'date', 'time')
      
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
      model = Ingredient
      fields = ('amount', 'measurement', 'name')
