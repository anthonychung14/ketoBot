from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns(
  'fridge.views',
  url(r'^items$', views.fridge, name='fridge'),
  url(r'^search$', views.search, name='search'),
  url(r'^portionAlgo$', views.portionAlgo, name='portionAlgo')
)