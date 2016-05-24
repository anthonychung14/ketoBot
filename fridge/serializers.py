from rest_framework import serializers
from models import FridgeItem, FridgeFill, MealPlan, MealPlanItem

class FridgeItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = FridgeItem
    fields = ('id','name', 'category', 'amount', 'measurement', 'servings', 'calories', 'protein', 'fat', 'carbs', 'fiber')

class FridgeFillSerializer(serializers.ModelSerializer):
  class Meta:
    model = FridgeFill
    fields = ('r', 'servings', 'protein', 'fat', 'carbs')

class MealPlanSerializer(serializers.ModelSerializer):
  class Meta:
    model = MealPlan
    fields = ('date', 'calories', 'protein', 'carbs', 'fat', 'eaten')

class MealPlanItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = MealPlanItem
    fields = ('name', 'calories', 'protein', 'carbs', 'fat', 'calories', 'servings', 'eaten', 'mealPlanRef', 'recipeRef', 'fridgeRef' )

