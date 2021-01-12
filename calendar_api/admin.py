# Django
from django.contrib import admin

# Register your models here.
from calendar_api.models import UserEvent, GroupEvent


@admin.register(UserEvent)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'event_name',
        'start_date',
        'end_date',
        'description',
    ]
    search_fields = [
        'user'
    ]


@admin.register(GroupEvent)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        'group',
        'owner',
        'event_name',
        'start_date',
        'end_date',
        'description',
    ]
    search_fields = [
        'owner'
    ]