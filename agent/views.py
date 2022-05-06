from django.shortcuts import render
from core.serializers import BusSerializer, TripscheduleSerializer, TicketSerializer, BoardingPointSerializer, DroppingPointSerializer
from core.models import Bus, Tripschedule, Ticket, BoardingPoint, DroppingPoint
from rest_framework.generics import ListAPIView

# Create your views here.
class BusView(ListAPIView):
    serializer_class = BusSerializer
    def get_queryset(self):
        return Bus.objects.all()

class TripScheduleView(ListAPIView):
    serializer_class = TripscheduleSerializer
    def get_queryset(self):
        return Tripschedule.objects.all()