from django.contrib import admin

# Register your models here.
from .models import UserNutrition, UserChoose

admin.site.register(UserNutrition)
admin.site.register(UserChoose)
