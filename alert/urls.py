from django.conf.urls import url
from . import views

# add an app_name to set the application namespace
app_name = 'alert'

urlpatterns = [
    # url(r'^$', views.index, name='index'),
    url(r'^getInfo$', views.getInfo, name='getInfo'),
    url(r'^setTime$', views.setTime, name='setTime'),
    url(r'^zhuyuanInfo$', views.zhuyuanInfo, name='zhuyuanInfo'),
    url(r'^zhuyuanTime$', views.zhuyuanTime, name='zhuyuanTime'),
]
