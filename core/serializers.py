from dataclasses import field
from rest_framework import serializers
from .models import Bus, Tripschedule, Ticket, DroppingPoint, BoardingPoint, Seat, Payment, UserInfo


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'


class BoardingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardingPoint
        fields = '__all__'


class DroppingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DroppingPoint
        fields = '__all__'

