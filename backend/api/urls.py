from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name="api-overview"),
    path('<int:feed_pk>/questions/', views.handle_questions, name="handle-questions"),
    path('<int:feed_pk>/questions/<int:pk>/', views.handle_question, name="handle-question"),

    path('feedbacks/', views.handle_feedbacks, name="handle-feedbacks"),
    path('feedbacks/<int:pk>', views.handle_feedback, name="handle-feedback"),

    path('feedback/<int:pk>/questions/', views.get_feedback_questions, name="get-feedback-questions"),

    path('get-user/<int:pk>/', views.get_user, name="get-user"),
]