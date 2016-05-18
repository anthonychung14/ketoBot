from rest_framework import serializers
from models import FridgeItem, FridgeFill

class FridgeItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = FridgeItem
    fields = ('id','name', 'category', 'amount', 'measurement', 'servings', 'calories', 'protein', 'fat', 'carbs', 'fiber')

class FridgeFillSerializer(serializers.ModelSerializer):
  class Meta:
    model = FridgeFill
    fields = ('r', 'servings', 'protein', 'fat', 'carbs')