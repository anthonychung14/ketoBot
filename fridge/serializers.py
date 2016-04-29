from rest_framework import serializers
from models import FridgeItem

class FridgeItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = FridgeItem
    fields = ('name', 'category', 'amount', 'measurement', 'servings', 'calories', 'protein', 'fat', 'carbs', 'fiber')