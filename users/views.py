# 3rd-party
from rest_framework import permissions
from rest_framework import viewsets
from users.models import CustomGroup, CustomUser
from users.serializers import CustomGroupSerializer, CustomUsersGet
from .permissions import PostOnlyPermissions


class CustomGroupViewSet(viewsets.ModelViewSet):
    queryset = CustomGroup.objects.all()
    serializer_class = CustomGroupSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        serializer.save(members=self.request.data.get('members'))



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUsersGet

    permission_classes = [permissions.IsAuthenticated]

