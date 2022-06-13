from agent.views import TripScheduleView, BusView, RetrieveUpdateDeleteBusAPIView, BoardingPointView, DroppingPointView
from django.urls import path
app_name = 'agent'

urlpatterns = [
    path('bus/', BusView.as_view(), name='bus'),
    path("bus_crud/<int:pk>/", RetrieveUpdateDeleteBusAPIView.as_view(),name="bus_crud"),
    #tripschedule
    path('tripschedule/', TripScheduleView.as_view(), name='tripschedule'),

    #boarding Point
    path('boading_point/', BoardingPointView.as_view(), name='boading_point'),
    path('dropping_point/', DroppingPointView.as_view(), name='dropping_point'),
]