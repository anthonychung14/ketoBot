import sys
djangoPath = '/Users/ACKeepingitCoo/Desktop/ketoBot'
sys.path.append(djangoPath)

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ketoMon.settings")
import django
django.setup()

from itertools import combinations
from ketoBot.models import Recipe, Recipe_Nutrition
from ketoBot.serializers import RecipeSerializer, RecipeNutritionSerializer
from fridge.models import FridgeItem
from fridge.serializers import FridgeItemSerializer

staples = Recipe.objects.filter(staple=True)
stapleSerializer = RecipeSerializer(staples, many=True)
stapleID = [int(x['id']) for x in stapleSerializer.data]    
gotStapleNutrition = Recipe_Nutrition.objects.filter(r__in=stapleID)
nutri = RecipeNutritionSerializer(gotStapleNutrition, many=True)

fridgeItems = FridgeItem.objects.all()
fridgeSerial = FridgeItemSerializer(fridgeItems, many=True)

def makeComboGenerator(arr):  
 for i in range(len(arr) + 1):
     for combo in map(list, combinations(arr, i)):
        yield combo

fridgeCombos = makeComboGenerator(fridgeSerial.data)
fridgeData = fridgeSerial.data




