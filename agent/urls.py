from agent.views import TripScheduleView, TripScheduleCrudView, delete_boarding_points, delete_trip_schedule, BusView, BusCrudView, delete_bus, BoardingPointView, delete_boarding_points, BoardingPointCrudView, DroppingPointView, delete_dropping_points
from django.urls import path
app_name = 'agent'

urlpatterns = [
    path('bus/<int:user_id>', BusView.as_view(), name='bus'),
    path('bus_crud/', BusCrudView.as_view(), name='bus_crud'),
    path('bus_crud/<int:pk>', BusCrudView.as_view(), name="bus_crud"),
    path("delete_bus/", delete_bus, name="delete_bus"),
    #tripschedule
    path('tripschedule/<int:user_id>', TripScheduleView.as_view(), name='tripschedule'),
    path('trip_schedule_crud/', TripScheduleCrudView.as_view(), name='trip_schedule_crud'),
    path('trip_schedule_crud/<int:pk>', TripScheduleCrudView.as_view(), name="trip_schedule_crud"),
    path("delete_trip_schedule/", delete_trip_schedule, name="delete_trip_schedule"),

    #boarding Point
    path('boading_point/<int:user_id>', BoardingPointView.as_view(), name='boading_point'),
    path('boading_point_crud/<int:pk>', BoardingPointCrudView.as_view(), name='boading_point_crud'),
    path("delete_boarding_points/", delete_boarding_points, name="delete_boarding_points"),
    path('dropping_point/<int:user_id>', DroppingPointView.as_view(), name='dropping_point'),
    path("delete_dropping_points/", delete_dropping_points, name="delete_dropping_points"),
]