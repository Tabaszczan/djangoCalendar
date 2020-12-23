# 3rd-party
from django.db.models import Q
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from users.models import CustomGroup, CustomUser
from users.serializers import CustomGroupSerializer, CustomUsersGet


class CustomGroupViewSet(viewsets.ModelViewSet):
    queryset = CustomGroup.objects.all()
    serializer_class = CustomGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        serializer.save(members=self.request.data.get('members'))

    @action(detail=False, methods=['get'])
    def get_details(self, request, *args, **kwargs):
        groups = CustomGroup.objects.filter(owner=request.user)
        print(groups)
        return Response({groups})

    def get_queryset(self):
        if self.request.user:
            qs = CustomGroup.objects.filter(
                Q(members__exact=self.request.user) | Q(owner=self.request.user),
            ).distinct()
            return qs
        return self.queryset


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUsersGet
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user:
            qs = CustomUser.objects.exclude(email=self.request.user.email)
            return qs
        return self.queryset
