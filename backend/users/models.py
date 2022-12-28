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
    # tier = models.IntegerField(choices=TIERS, default=TIERS[0])

    def __str__(self):
        return self.username