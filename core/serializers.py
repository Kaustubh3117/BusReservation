from dataclasses import field, fields
from rest_framework import serializers
from .models import Bus, Tripschedule, Ticket, DroppingPoint, BoardingPoint, Seat, Payment, UserInfo


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'bus_name', 'bus_no', 'capacity', 'bus_type', 'image', 'agent']


class BoardingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardingPoint
        fields = '__all__'


class DroppingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DroppingPoint
        fields = '__all__'

class TripscheduleSerializer(serializers.ModelSerializer):
    bus_id = BusSerializer()
    class Meta:
        model = Tripschedule
        fields = ['id', 'trip_date', 'departure_time', 'arrival_time', 'available_seat', 'ticket_sold', 'price', 'journey_time', 'status', 'bus_id']

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
     class Meta:
        model = Ticket
        fields = '__all__'

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'
