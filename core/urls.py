from logging import Filter
from django.urls import path
from .views import (
   BoardingPointView,
   DroppingPointView,
#    filter_trip_schedule,
   FilterTripSchedule,
)
app_name = 'core'

urlpatterns = [
    path('boarding_point/', BoardingPointView.as_view(), name='boarding_point'),
    path('dropping_point/', DroppingPointView.as_view(), name='dropping_point'),
    # path('filter_trip_schedule/<str:boarding_point>/<str:dropping_point>/<str:date>/',  filter_trip_schedule, name='filter_trip_schedule'),
    path('filter_trip_schedule/<str:boarding_point>/<str:dropping_point>/<str:date>', FilterTripSchedule.as_view(), name='filter_trip_schedule'),
]