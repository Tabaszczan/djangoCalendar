from rest_framework import permissions
from rest_framework.permissions import BasePermission


class PostOnlyPermissions(BasePermission):
    def has_permission(self, request, view):
        if request.method in ('POST',):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in ('GET',):
            return obj == request.user
        return False