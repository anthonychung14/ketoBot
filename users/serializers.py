from rest_framework import serializers
from models import UserChoose, UserAuth, UserPlan

class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
      model = UserAuth
      fields = ('name')

class UserInfoSerializer(serializers.ModelSerializer):    
    class Meta:
      model = UserChoose
      fields = ('user', 'r', 'eatAgain')
      
class UserPlanSerializer(serializers.ModelSerializer):
    class Meta:
      model = UserPlan
      fields = ('name', 'calories', 'fats', 'carbs', 'protein', 'days', 'meals', 'freeCal', 'want', 'noWant')
