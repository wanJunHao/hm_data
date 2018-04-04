from django.conf.urls import url
from . import views

# add an app_name to set the application namespace
app_name = 'tupian'

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
