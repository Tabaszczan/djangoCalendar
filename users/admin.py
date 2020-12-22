# Django
from django.contrib import admin

from .models import CustomUser, CustomGroup


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        'email',
        'first_name',
        'last_name',
        'telephone',
    ]


@admin.register(CustomGroup)
class CustomGroupAdmin(admin.ModelAdmin):
    list_display = [
        'group_name',
    ]
