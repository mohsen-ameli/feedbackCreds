from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name="api-overview"),
    path('<int:feed_pk>/questions/', views.handle_questions, name="handle-questions"),
    path('<int:feed_pk>/questions/<int:pk>/', views.handle_question, name="handle-question"),

    path('feedbacks/', views.handle_feedbacks, name="handle-feedbacks"),
    path('feedbacks/<int:pk>/', views.handle_feedback, name="handle-feedback"),

    path('feedback-response/<uuid:uuid>/', views.handle_feedback_response, name="handle-feedback-response"),
    path('feedback-responses/<int:pk>/', views.handle_feedback_responses, name="handle-feedback-responses"),
    path('get-feedback-from-uuid/<uuid:uuid>/', views.get_feedback_from_uuid, name="get-feedback-from-uuid"),

    path('get-user/<int:pk>/', views.get_user, name="get-user"),
]