from django.contrib import admin

from .models import Recipe
from .models import Recipe_Nutrition


admin.site.register(Recipe)
admin.site.register(Recipe_Nutrition)
