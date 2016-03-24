from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns(
    'ketoBot.views',
    url(r'^recipes/$', views.recipe_list, name='views.recipe_list'),
    url(r'^recipes/(?P<pk>[0-9]+)$', 'recipe_detail', name='recipe_detail')
    #ex: /diet/2/result
)