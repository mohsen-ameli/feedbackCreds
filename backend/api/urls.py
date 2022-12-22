from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview),
    path('questions/', views.handle_questions),
    path('questions/<int:pk>/', views.handle_question),
    path('num-questions/', views.number_of_questions),
    path('get-user/<int:pk>/', views.get_user),
]