from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse

# Create your views here.

from .models import UserAuth, UserChoose

def userList(request):

  return HttpResponse("Hello")

def userInfo(request):

  return HttpResponse("Goodbye")