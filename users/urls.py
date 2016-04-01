from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns(
    'users.views',
    url(r'^diet$', views.userDiet, name='views.userDiet'),
    # url(r'^users/(?P<pk>[0-9]+)$', views.userInfo, name='views.userInfo'),
    #ex: /diet/2/result
)