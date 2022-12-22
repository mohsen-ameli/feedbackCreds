from django.contrib import admin
from .models import Feedback, Question, CustomUser

admin.site.register(Feedback)
admin.site.register(Question)
admin.site.register(CustomUser)
