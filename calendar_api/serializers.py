# 3rd-party
from rest_framework import serializers
from users.models import CustomGroup

# Local
from .models import GroupEvent
from .models import UserEvent


class EventUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = ['event_name', 'start_date', 'end_date', 'description']


class GroupEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupEvent
        fields = ['event_name', 'start_date', 'end_date', 'description', 'group', 'owner']
