from django.urls import path
from .views import (
   BoardingPointView,
   DroppingPointView
)
app_name = 'core'

urlpatterns = [
    path('boarding_point/', BoardingPointView.as_view(), name='boarding_point'),
    path('dropping_point/', DroppingPointView.as_view(), name='dropping_point'),
]