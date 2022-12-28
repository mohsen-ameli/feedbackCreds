from django.contrib import admin
from .models import Feedback, Question, FeedbackResponse

admin.site.register(Feedback)
admin.site.register(Question)
admin.site.register(FeedbackResponse)