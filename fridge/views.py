import requests
import json

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.http import Http404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes

from django.core.cache import cache

from .models import FridgeItem

@api_view(['GET', 'POST'])
def fridge(request):
  if request.method == 'GET':
    return Response("yo")
  elif request.method == 'POST':
    print (request.body)
    return Response(request.body)
