from agent.views import TripScheduleView, BusView
from django.urls import path
app_name = 'agent'

urlpatterns = [
    path('bus/', BusView.as_view(), name='bus'),
    path('tripschedule/', TripScheduleView.as_view(), name='tripschedule'),
]