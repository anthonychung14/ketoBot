from django.contrib import admin

# Register your models here.
from .models import UserPlan, UserChoose

admin.site.register(UserPlan)
admin.site.register(UserChoose)
