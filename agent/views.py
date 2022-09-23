from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import viewsets
from accounts.models import UserAccount

from core.serializers import BusSerializer, TripscheduleSerializer, TicketSerializer, BoardingPointSerializer, DroppingPointSerializer
from core.models import Bus, Tripschedule, Ticket, BoardingPoint, DroppingPoint

# bus
class BusView(ListAPIView):
    serializer_class = BusSerializer
    def get_queryset(self):
        agent_id = self.kwargs['user_id']
        busses = Bus.objects.filter(agent = agent_id)
        return busses

class BusCrudView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        print("request data ******", request.data)
        serializer = BusSerializer(data=request.data)
        print("serialkizer......", serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        print('pk***********', pk)
        snippet = Bus.objects.get(pk=pk)
        serializer = BusSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_bus(request):
    payload = request.data['data']
    if payload != None:
        for id in payload:
            bus = get_object_or_404(Bus, pk=id)
            bus.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
#trip schedule
class TripScheduleView(ListAPIView):
    serializer_class = TripscheduleSerializer
    def get_queryset(self):
        agent_id = self.kwargs['user_id']
        trip_schedule =  Tripschedule.objects.filter(bus_id__agent = agent_id)
        return trip_schedule

class TripScheduleCrudView(APIView):
    def post(self, request, format=None):
        print("request data ******", request.data)
        serializer = TripscheduleSerializer(data=request.data)
        print("serialkizer......", serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        print('pk***********', pk)
        snippet = Tripschedule.objects.get(pk=pk)
        serializer = TripscheduleSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_trip_schedule(request):
    payload = request.data['data']
    if payload != None:
        for id in payload:
            bus = get_object_or_404(Bus, pk=id)
            bus.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
#boarding point
class BoardingPointView(ListAPIView):
    serializer_class = BoardingPointSerializer
    def get_queryset(self):
        return BoardingPoint.objects.all()

class BoardingPointCrudView(APIView):
    def post(self, request, format=None):
        serializer = BoardingPointSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = BoardingPointSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#dropping point
class DroppingPointView(ListAPIView):
    serializer_class = DroppingPointSerializer
    def get_queryset(self):
        return DroppingPoint.objects.all()