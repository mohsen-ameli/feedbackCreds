from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'User Info',
            {
                'fields': (
                    'is_business',
                    'credit',
                    'tier',
                )
            }
        )
    )

admin.site.register(CustomUser, CustomUserAdmin)
