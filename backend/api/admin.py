from django.contrib import admin
from .models import Feedback, Question, CustomUser, FeedbackResponse

admin.site.register(Feedback)
admin.site.register(Question)
admin.site.register(FeedbackResponse)
admin.site.register(CustomUser)