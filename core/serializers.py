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
    trip_schedule_id = TripscheduleSerializer()
    class Meta:
        model = Ticket
        fields = ['id', 'total_amount', 'number_of_seats', 'seat_no', 'boarding_point', 'dropping_point', 'trip_schedule_id', 'user', 'booked', 'canceled']

class UserInfoSerializer(serializers.ModelSerializer):
    ticket = TicketSerializer()
    class Meta:
        model = UserInfo
        fields = ['id', 'user', 'ticket_number', 'name', 'mobile_number', 'gender', 'age', 'ticket']


