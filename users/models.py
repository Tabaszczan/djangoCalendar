# Django
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext as _

# 3rd-party
from phonenumber_field.modelfields import PhoneNumberField


class CustomUser(User):
    avatar = models.ImageField(_('avatar'), blank=True)
    telephone = PhoneNumberField(_('phone number'), blank=True)

    def __str__(self):
        return self.email


class CustomGroup(models.Model):
    group_name = models.CharField(_('group name'), max_length=200, blank=False, null=False)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name=_('owner'))
    members = models.ManyToManyField(CustomUser, verbose_name=_('members'), related_name='group_members')

    def __str__(self):
        return self.group_name
