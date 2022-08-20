from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view

from core.serializers import BusSerializer, TripscheduleSerializer, TicketSerializer, BoardingPointSerializer, DroppingPointSerializer
from core.models import Bus, Tripschedule, Ticket, BoardingPoint, DroppingPoint



# Create your views here.
class BusView(ListAPIView):
    serializer_class = BusSerializer
    def get_queryset(self):
        return Bus.objects.all()

@api_view(['POST'])
def delete_bus(request):
    payload = request.data['data']
    if payload != None:
        for id in payload:
            bus = get_object_or_404(Bus, pk=id)
            bus.delete()
    return Response(status=status.HTTP_202_ACCEPTED) 

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