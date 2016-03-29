from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns(
    'ketoBot.views',
    url(r'^recipes/$', views.reactApp, name='reactApp'),
    url(r'^recipes/(?P<pk>[0-9]+)$', views.recipe_detail, name='recipe_detail'),
    url(r'^recipes/search', views.search, name='search')    
)