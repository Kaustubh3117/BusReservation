from django.db import models
from BusReservation import settings


class AgentInformation(models.Model):
    agent_first_name = models.CharField(max_length=30)
    agent_last_name = models.CharField(max_length=30)
    agent_mobile_no = models.CharField(max_length=15)
    agent_address = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.username
