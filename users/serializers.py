# 3rd-party
from phonenumber_field.serializerfields import PhoneNumberField
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from users.models import CustomGroup
from users.models import CustomUser


class CustomUserSerializer(RegisterSerializer):
    first_name = serializers.CharField(
        required=False,
        max_length=100,
    )
    last_name = serializers.CharField(
        required=False,
        max_length=100,
    )
    telephone = PhoneNumberField(
        required=False
    )

    def get_cleaned_data(self):
        print(self.validated_data.get('telephone', ''))
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['telephone'] = self.validated_data.get('telephone', '')
        print(data_dict)
        return data_dict



class CustomGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomGroup
        fields = ['id', 'group_name', 'members']
