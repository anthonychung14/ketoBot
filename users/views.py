from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse

import requests
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import UserDietSerializer

from .models import UserAuth, UserChoose, UserNutrition

@api_view(['GET', 'POST'])
def userDiet(request):  
  if request.method == 'POST':
    print(request.data, "REQUEST DATA")
    serializer = UserDietSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'GET':
    print("gotta get it")


def userInfo(request):
  return HttpResponse("Goodbye")