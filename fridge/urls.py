from django.conf.urls import patterns, include, url
from . import views


urlpatterns = patterns(
  'fridge.views',
  url(r'^items$', views.fridge, name='fridge')
)