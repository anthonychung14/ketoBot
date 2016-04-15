from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns(
    'ketoBot.views',
    url(r'^react/$', views.reactApp, name='reactApp'),
    url(r'^recipes$', views.recipe_list, name='recipe_list'),
    url(r'^nutrition$', views.recipe_nutrition, name='recipe_nutrition'),
    url(r'^recipes/search', views.search, name='search')    
)