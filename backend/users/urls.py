from django.urls import path
from . import views

urlpatterns = [
    path('get-user/<int:pk>/', views.get_user, name="get-user"),
    path('create-user/', views.create_user, name="create-user"),
]