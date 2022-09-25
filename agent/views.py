from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
import copy
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

#get all data to dashboard
class DashBoardView(APIView):
    def get(self, request, format=None, **kwargs):
        agent_id = self.kwargs['user_id']
        busses = Bus.objects.filter(agent = agent_id).values()
        bus_list = list(busses)
        res = []
        for bus in bus_list:
            trip_schedule = Tripschedule.objects.filter(bus_id = bus['id']).values()
            trip_schedule_list = list(trip_schedule)
            bus['tripSchedule'] = trip_schedule_list
            for schedule in trip_schedule_list:
                boarding_point = BoardingPoint.objects.filter(trip_schedule_id = schedule['id']).values()
                dropping_point = DroppingPoint.objects.filter(trip_schedule_id = schedule['id']).values()
                ticket = Ticket.objects.filter(trip_schedule_id = schedule['id']).values()
                schedule['boarding_point'] = list(boarding_point)
                schedule['dropping_point'] = list(dropping_point)
                schedule['ticket'] = list(ticket)
            res.append(bus)

        return Response(res)

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
        serializer = BusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
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
        trip_date = request.data['trip_date']
        departure_time = request.data['departure_time']
        arrival_time = request.data['arrival_time']
        available_seat = request.data['available_seat']
        journey_time = request.data['journey_time']
        price = request.data['price']
        bus_id = request.data['bus_id']
    
        bus = Bus.objects.get(pk=bus_id)
        validate_trip_schedule = Tripschedule.objects.filter(bus_id__id = bus_id)
        schedule_active = False
        for data in validate_trip_schedule:
            if data.status == True:
                schedule_active = True
        # agent = UserAccount.objects.get(pk = agent)
        if schedule_active == False:
            trip_schedule = Tripschedule(trip_date=trip_date, departure_time=departure_time,arrival_time=arrival_time,available_seat=available_seat,price=price,journey_time=journey_time,bus_id=bus, status=True)
            trip_schedule.save()
            return Response(None, status=status.HTTP_201_CREATED)
        else:
             return Response(None, status=500)
       

    def put(self, request, pk, format=None):
        trip_date = request.data['trip_date']          
        departure_time = request.data['departure_time']           
        arrival_time = request.data['arrival_time']            
        available_seat = request.data['available_seat']           
        journey_time = request.data['journey_time']           
        price = request.data['price']
        status = request.data['status']
        bus_id = request.data['bus_id']
        
        bus = Bus.objects.get(pk=bus_id)
        trip_schedule = Tripschedule.objects.get(pk = pk)
        trip_schedule.trip_date = trip_date
        trip_schedule.departure_time = departure_time
        trip_schedule.arrival_time = arrival_time        
        trip_schedule.available_seat = available_seat
        trip_schedule.price = price
        trip_schedule.journey_time = journey_time
        trip_schedule.bus_id = bus
        trip_schedule.status = status
        trip_schedule.save()
        
        return Response(None)

@api_view(['POST'])
def delete_trip_schedule(request):
    payload = request.data['data']
    if payload != None:
        for id in payload:
            trip_schedule = get_object_or_404(Tripschedule, pk=id)
            trip_schedule.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
#boarding point
class BoardingPointView(ListAPIView):
    serializer_class = BoardingPointSerializer
    def get_queryset(self):
        agent_id = self.kwargs['user_id']
        boarding_point = BoardingPoint.objects.filter(trip_schedule_id__bus_id__agent = agent_id)
        return boarding_point

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

@api_view(['POST'])
def delete_boarding_points(request):
    payload = request.data['data']
    if payload != None:
        for id in payload:
            boarding_point = get_object_or_404(BoardingPoint, pk=id)
            boarding_point.delete()
    return Response(status=status.HTTP_202_ACCEPTED)

#dropping point
class DroppingPointView(ListAPIView):
    serializer_class = DroppingPointSerializer
    def get_queryset(self):
        agent_id = self.kwargs['user_id']
        dropping_point = DroppingPoint.objects.filter(trip_schedule_id__bus_id__agent = agent_id)
        return dropping_point

class DroppingPointCrudView(APIView):
    def post(self, request, format=None):
        serializer = DroppingPointSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = DroppingPointSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def delete_dropping_points(request):
    payload = request.data['data']
    if payload != None:
        for id in payload:
            dropping_point = get_object_or_404(DroppingPoint, pk=id)
            dropping_point.delete()
    return Response(status=status.HTTP_202_ACCEPTED)