from rest_framework import serializers

from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'avatar',
            'telephone',
        ]


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        form = CustomUser
        model = CustomUser
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'avatar',
            'telephone',
        ]

    def save(self, **kwargs):
        user = super().save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'email',
            'password',
        ]
