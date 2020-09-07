from rest_framework import serializers

from .models import Event, UserEvent


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['event_name', 'start_date', 'end_date', 'description']


class EventUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = ['event_name', 'start_date', 'end_date', 'description', 'user']