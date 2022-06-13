from django.shortcuts import render
from core.serializers import BusSerializer, TripscheduleSerializer, TicketSerializer, BoardingPointSerializer, DroppingPointSerializer
from core.models import Bus, Tripschedule, Ticket, BoardingPoint, DroppingPoint
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView

# Create your views here.
class BusView(ListAPIView):
    serializer_class = BusSerializer
    def get_queryset(self):
        return Bus.objects.all()

class RetrieveUpdateDeleteBusAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class TripScheduleView(ListAPIView):
    serializer_class = TripscheduleSerializer
    def get_queryset(self):
        return Tripschedule.objects.all()

class BoardingPointView(ListAPIView):
    serializer_class = BoardingPointSerializer
    def get_queryset(self):
        return BoardingPoint.objects.all()

class DroppingPointView(ListAPIView):
    serializer_class = DroppingPointSerializer
    def get_queryset(self):
        return DroppingPoint.objects.all()