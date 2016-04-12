from rest_framework import serializers
from models import UserChoose, UserAuth, UserNutrition

class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
      model = UserAuth
      fields = ('name')

class UserInfoSerializer(serializers.ModelSerializer):    
    class Meta:
      model = UserChoose
      fields = ('user', 'r', 'eatAgain')
      
class UserDietSerializer(serializers.ModelSerializer):
    class Meta:
      model = UserNutrition
      fields = ('name', 'date', 'calories', 'fats', 'carbs', 'protein')
