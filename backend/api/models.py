from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid


class Question(models.Model):
    STRING_CHOICES = (
        ('Written-response', 'Written Response'),
        ('Multiple-choice', 'Multiple Choice'),
        ('True-or-false', 'True or False'),
    )
    title = models.CharField(max_length=250, blank=True, default="")
    question_type = models.CharField(max_length=20, choices=STRING_CHOICES, blank=True, default="")
    choices = ArrayField(models.CharField(max_length=150, blank=True, default=""), size=4, blank=True, default=list)

    feedback = models.ForeignKey("Feedback", on_delete=models.CASCADE)

    def __str__(self):
        return f"pk: {self.pk} title: {self.title or 'None'}"


class Feedback(models.Model):
    name = models.CharField(max_length=150, blank=True, default="")

    # TODO: Add this whenever login and signup is implemented
    # user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"pk: {self.pk} name: {self.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class FeedbackResponse(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    feedback = models.ForeignKey("Feedback", on_delete=models.CASCADE)
    response = models.JSONField(blank=True, default=dict)
    is_submitted = models.BooleanField(default=False)

    def __str__(self):
        return f"feedback: {self.feedback}"
