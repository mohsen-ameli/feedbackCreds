from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    TIERS = (
        (0, 'Free'),
        (1, 'Mid'),
        (2, 'Pro'),
    )

    is_business = models.BooleanField(default=False)
    credit = models.FloatField(blank=True, default=0.0)
    tier = models.CharField(max_length=10, choices=TIERS, default=TIERS[0][1])

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)