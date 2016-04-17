from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse

import requests
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import UserPlanSerializer

from .models import UserAuth, UserChoose, UserPlan

@api_view(['GET', 'POST'])
def userPlan(request):  
  if request.method == 'POST':    

    print(request.body, "json?")
    # serializer = UserPlanSerializer(data = request.data)
    # if serializer.is_valid():
    #   serializer.save()
      # return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response("Got it")
    # else:
    #   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'GET':
    return Response("gotta get it")


def userInfo(request):
  return HttpResponse("Goodbye")