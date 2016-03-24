from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns(
    'users.views',
    url(r'^users/$', views.userList, name='views.userList'),
    url(r'^users/(?P<pk>[0-9]+)$', views.userInfo, name='userInfo'),
    #ex: /diet/2/result
)