import json
from django.shortcuts import render
from rest_framework import generics
from .serializers import BoardingPointSerializer, DroppingPointSerializer, TripscheduleSerializer
from .models import BoardingPoint, DroppingPoint, Tripschedule
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

class BoardingPointView(generics.ListCreateAPIView):
    queryset = BoardingPoint.objects.all()
    serializer_class = BoardingPointSerializer


class DroppingPointView(generics.ListCreateAPIView):
    queryset = DroppingPoint.objects.all()
    serializer_class = DroppingPointSerializer


class FilterTripSchedule(generics.ListAPIView):
    serializer_class = TripscheduleSerializer
    queryset = Tripschedule.objects.all()
    def get_queryset(self): 
        boarding_point = self.kwargs['boarding_point']
        dropping_point = self.kwargs['dropping_point']
        trip_date = self.kwargs['date']
        #get dropping point
        dropping_list = DroppingPoint.objects.filter(
            Q(drop_location__icontains=dropping_point)
        )

        print("dropping Point...", dropping_list)
        #get boading point
        boarding_list = BoardingPoint.objects.filter(
            Q(pick_location__icontains=boarding_point)
        )

        boarding_trip_schedule_id = []
        for boarding_list in boarding_list:
            boarding_trip_schedule_id.append(boarding_list.trip_schedule_id.pk)
        
        dropping_trip_schedule_id = []
        for dropping_list in dropping_list:
            dropping_trip_schedule_id.append(dropping_list.trip_schedule_id.pk)

        object_list = self.queryset.filter(Q(pk__in=boarding_trip_schedule_id) & Q(pk__in=dropping_trip_schedule_id) & Q(trip_date=trip_date))
        if object_list is not None:
            return object_list
        else:
            return Response({"message": "No Bus Available"}, status=HTTP_400_BAD_REQUEST)

class SeatView(generics.ListAPIView):
    serializer_class = TripscheduleSerializer
    queryset = Tripschedule.objects.all()
    def get_queryset(self):
        trip_schedule_id = self.kwargs['trip_schedule_id']
        obj_list = self.queryset.filter(pk = trip_schedule_id)
        if obj_list is not None:
            return obj_list
        else:
            return Response({"message": "No Schedule Available"}, status=HTTP_400_BAD_REQUEST)


