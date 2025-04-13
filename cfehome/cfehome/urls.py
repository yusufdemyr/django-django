from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.hello_world, name='hello_world'),
    path('healthz/', views.healthz_view, name='healthz'),
    path('admin/', admin.site.urls),
]
