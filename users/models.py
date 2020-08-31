from django.contrib.auth.models import AbstractUser, UserManager
from django.core.validators import MaxLengthValidator
from django.db import models
from django.utils.translation import gettext as _
# Create your models here.
from phonenumber_field.modelfields import PhoneNumberField


class CustomUser(AbstractUser):

    avatar = models.ImageField(_('avatar'))
    telephone = PhoneNumberField()

    def __str__(self):
        return self.email
