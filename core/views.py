from django.shortcuts import render
from rest_framework import generics
from .serializers import BoardingPointSerializer, DroppingPointSerializer
from .models import BoardingPoint, DroppingPoint


class BoardingPointView(generics.ListCreateAPIView):
    queryset = BoardingPoint.objects.all()
    serializer_class = BoardingPointSerializer


class DroppingPointView(generics.ListCreateAPIView):
    queryset = DroppingPoint.objects.all()
    serializer_class = DroppingPointSerializer
