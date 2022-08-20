from logging import Filter
from django.urls import path
from .views import (
   BoardingPointView,
   DroppingPointView,
#    filter_trip_schedule,
   FilterTripSchedule,
   SeatView,
   PassengerView,
   ReservedSeatView,
   ManageBookingView,
   CancelBookingView,
   PaymentView,
   VerifySignatureView
)
app_name = 'core'

urlpatterns = [
    path('boarding_point/', BoardingPointView.as_view(), name='boarding_point'),
    path('dropping_point/', DroppingPointView.as_view(), name='dropping_point'),
    path('filter_trip_schedule/<str:boarding_point>/<str:dropping_point>/<str:date>', FilterTripSchedule.as_view(), name='filter_trip_schedule'),
    path('view_seat/<int:trip_schedule_id>', SeatView.as_view(), name='view_seat'),
    path('passenger_data/', PassengerView.as_view(), name='passenger_data'),
    path('payment/', PaymentView.as_view(), name='payment'),
    path('verifySignature/', VerifySignatureView.as_view(), name='verifySignature'),
    path('get_seat/<int:bus_id>', ReservedSeatView.as_view(), name='get_seat'),
    path('manage_booking/<int:user>', ManageBookingView.as_view(), name='manage_booking'),
    path('cancel_booking_view/<int:ticket_id>', CancelBookingView.as_view(), name='cancel_booking_view'),

]