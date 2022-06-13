from agent.views import TripScheduleView, BusView, RetrieveUpdateDeleteBusAPIView
from django.urls import path
app_name = 'agent'

urlpatterns = [
    path('bus/', BusView.as_view(), name='bus'),
    path("bus_crud/<int:pk>/", RetrieveUpdateDeleteBusAPIView.as_view(),name="bus_crud"),
    #tripschedule
    path('tripschedule/', TripScheduleView.as_view(), name='tripschedule'),
]