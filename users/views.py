from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse

import requests
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import UserPlanSerializer

from django.core.cache import cache


from .models import UserAuth, UserChoose, UserPlan

@api_view(['GET', 'POST'])
def userPlan(request):  
  if request.method == 'POST':                
    cache.set("userGoal", request.body)    
    cache.persist("userGoal")
    serializer = UserPlanSerializer(cache.get("userGoal"))
    
    ##save to DB from redis at a later time
    serializerSave = UserPlanSerializer(data = request.data)
    if serializerSave.is_valid():
      serializerSave.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)    
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)

  elif request.method == 'GET':
    if cache.get("userGoal"):      
      gotUserGoal = cache.get("userGoal")            
      print(gotUserGoal, "this is not the goal we had in mind")
      serializer = UserPlanSerializer(gotUserGoal)
      return Response(gotUserGoal)
  return Response("no cache bro")      

def userInfo(request):
  return HttpResponse("Goodbye")