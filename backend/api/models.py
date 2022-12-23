from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser


class Question(models.Model):
    STRING_CHOICES = (
        ('Written-response', 'Written Response'),
        ('Multiple-choice', 'Multiple Choice'),
        ('True-or-false', 'True or False'),
    )
    title = models.CharField(max_length=250, blank=True, default="")
    question_type = models.CharField(max_length=20, choices=STRING_CHOICES, blank=True, default="")
    choice_1 = models.CharField(max_length=150, blank=True, default="")
    choice_2 = models.CharField(max_length=150, blank=True, default="")
    choice_3 = models.CharField(max_length=150, blank=True, default="")
    choice_4 = models.CharField(max_length=150, blank=True, default="")

    feedback = models.ForeignKey("Feedback", on_delete=models.CASCADE)

    def __str__(self):
        return f"pk: {self.pk} title: {self.title or 'None'}"


class Feedback(models.Model):
    name = models.CharField(max_length=150, blank=True, default="")
    qr_code = models.CharField(max_length=150, blank=True, default="")

    # TODO: Add this whenever login and signup is implemented
    # user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"pk: {self.pk} name: {self.name}"

    def save(self, *args, **kwargs):
        print("saving: ", self.qr_code)
        super().save(*args, **kwargs)


class CustomUser(AbstractUser):
    is_business = models.BooleanField(default=False)
    credit = models.FloatField(blank=True, default=0.0)

    def __str__(self):
        return self.username
