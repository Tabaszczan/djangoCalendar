from allauth.account.views import confirm_email
from django.contrib import admin
from django.urls import include
from django.urls import path

# 3rd-party
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from calendar_api.views import GroupEventViewSet
from calendar_api.views import UserEventViewSet
from rest_framework import routers
from users.views import CustomGroupViewSet

router = routers.DefaultRouter()
router.register(r'groups', CustomGroupViewSet)
# router.register(r'users', CustomUserViewSet)
router.register(r'user_events', UserEventViewSet)
router.register(r'group_events', GroupEventViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('rest-auth/', include('rest_auth.urls'), name='rest_auth'),
    path('rest-auth/registration/', include('rest_auth.registration.urls'), name='rest_auth_registration'),
    path('account/', include('allauth.urls'), name='account'),
    # path('accounts-rest/registration/account-confirm-email/<key>/', confirm_email, name='account_confirm_email'),
    path('api/token-auth/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token-auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
