from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

from .models import Event
from .serializers import  EventSerializer


# Create your views here.


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
