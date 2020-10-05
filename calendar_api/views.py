# Django
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.db.models import Q

# 3rd-party
from rest_framework import permissions
from rest_framework import viewsets
from users.models import CustomGroup

# Local
from .models import Event
from .models import GroupEvent
from .models import UserEvent
from .serializers import EventUserSerializer
from .serializers import GroupEventSerializer


# Create your views here.


class UserEventViewSet(viewsets.ModelViewSet):
    queryset = UserEvent.objects.all()
    serializer_class = EventUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(user=user)
        return queryset


class GroupEventViewSet(viewsets.ModelViewSet):
    queryset = GroupEvent.objects.all()
    serializer_class = GroupEventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        groups_members = CustomGroup.objects.filter(Q(members=user) | Q(owner=user))
        qs = self.queryset.filter(group__in=groups_members)
        return qs
