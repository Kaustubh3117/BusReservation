from agent.views import TripScheduleView, BusView, BusCrudView, delete_bus, BoardingPointView, BoardingPointCrudView, DroppingPointView
from django.urls import path
app_name = 'agent'

urlpatterns = [
    path('bus/', BusView.as_view(), name='bus'),
    path('bus_crud/<int:pk>', BusCrudView.as_view(), name='bus_crud'),
    path("delete_bus/", delete_bus, name="delete_bus"),
    #tripschedule
    path('tripschedule/', TripScheduleView.as_view(), name='tripschedule'),

    #boarding Point
    path('boading_point/', BoardingPointView.as_view(), name='boading_point'),
    path('boading_point_crud/<int:pk>', BoardingPointCrudView.as_view(), name='boading_point_crud'),
    path('dropping_point/', DroppingPointView.as_view(), name='dropping_point'),
]