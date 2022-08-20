from agent.views import TripScheduleView, BusView, delete_bus, BoardingPointView, DroppingPointView
from django.urls import path
app_name = 'agent'

urlpatterns = [
    path('bus/', BusView.as_view(), name='bus'),
    path("delete_bus/", delete_bus, name="delete_bus"),
    #tripschedule
    path('tripschedule/', TripScheduleView.as_view(), name='tripschedule'),

    #boarding Point
    path('boading_point/', BoardingPointView.as_view(), name='boading_point'),
    path('dropping_point/', DroppingPointView.as_view(), name='dropping_point'),
]