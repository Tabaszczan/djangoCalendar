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
    search_fields = [
        'email'
    ]


@admin.register(CustomGroup)
class CustomGroupAdmin(admin.ModelAdmin):
    list_display = [
        'group_name',
    ]
    search_fields = [
        'group_name'
    ]
