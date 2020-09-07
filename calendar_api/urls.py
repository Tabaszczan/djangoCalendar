# Django
from django.conf.urls import url
from rest_framework import routers
from django.contrib import admin
from calendar_api import views
from django.urls import path, include

from calendar_api.views import EventViewSet, UserEventViewSet

router = routers.SimpleRouter()
router.register(r'event', EventViewSet)
router.register(r'userevent', UserEventViewSet)


urlpatterns = [
    path('', include((router.urls, 'calendar_event'))),
]