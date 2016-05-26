from django.contrib import admin

from .models import Recipe, Recipe_Nutrition, Ingredient, Ingred_Nutrition

admin.site.register(Recipe)
admin.site.register(Recipe_Nutrition)
admin.site.register(Ingredient)
admin.site.register(Ingred_Nutrition)
