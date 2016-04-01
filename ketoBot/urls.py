from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns(
    'ketoBot.views',
    # url(r'^recipes/$', views.reactApp, name='reactApp'),
    url(r'^recipes/', views.recipe_list, name='recipe_list'),
    url(r'^recipes/search', views.search, name='search')    
)