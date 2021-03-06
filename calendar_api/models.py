# Django
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext as _

# 3rd-party
from users.models import CustomGroup
from users.models import CustomUser


class Event(models.Model):
    event_name = models.CharField(_('name'), max_length=45)
    start_date = models.DateTimeField(_('start date'))
    end_date = models.DateTimeField(_('end date'))
    description = models.TextField(_('description'), max_length=255)

    class Meta:
        verbose_name = _('event')
        verbose_name_plural = _('events')
        ordering = ['-start_date']


class UserEvent(Event):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name=_('user'))

    class Meta:
        verbose_name = _('user event')
        verbose_name_plural = _('users events')


class GroupEvent(Event):
    group = models.ForeignKey(CustomGroup, on_delete=models.CASCADE, verbose_name=_('group'))
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name=_('owner'), null=True)

    class Meta:
        verbose_name = _('group event')
        verbose_name_plural = _('groups events')
