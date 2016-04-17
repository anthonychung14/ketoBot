from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns(
    'users.views',
    url(r'^plan$', views.userPlan, name='views.userPlan'),
    # url(r'^users/(?P<pk>[0-9]+)$', views.userInfo, name='views.userInfo'),
    #ex: /diet/2/result
)