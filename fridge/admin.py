from django.contrib import admin

from .models import FridgeItem, FridgeInventory, FridgeFill, MealPlan, MealPlanItem

admin.site.register(FridgeFill) 
admin.site.register(MealPlan)
admin.site.register(MealPlanItem)

class FridgeItemAdmin(admin.ModelAdmin):
  list_display=('name', 'category', 'amount', 'measurement', 'servings')
  search_fields = ('name', 'category')

class FridgeInventoryAdmin(admin.ModelAdmin):
  list_display=('fridgeItem', 'eaten')
  search_fields = ('eaten','eaten')

class MealPlanAdmin(admin.ModelAdmin):
  list_display=('date', 'calories')
  search_fields = ('date')

admin.site.register(FridgeItem, FridgeItemAdmin)
admin.site.register(FridgeInventory, FridgeInventoryAdmin)