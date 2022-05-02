import random
import string

from re import I
from django.shortcuts import render
from rest_framework import generics
from .serializers import BoardingPointSerializer, DroppingPointSerializer, SeatSerializer, TicketSerializer, TripscheduleSerializer, UserInfoSerializer
from .models import BoardingPoint, DroppingPoint, Ticket, Tripschedule, UserInfo, Seat, Bus
from accounts.models import UserAccount
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
import re

def create_ticket_number():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=20))

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

class PassengerView(APIView):
     def post(self, request, format=None):
        ticket_number = create_ticket_number()
        res_user_id = request.data['payload']['seat_data']['seatData']['loggedInUserId']
        res_bus_id = request.data['payload']['seat_data']['seatData']['busId']
        res_trip_schedule_id = request.data['payload']['seat_data']['seatData']['tripScheduleId']
        ticket_res_data =  request.data['payload']['seat_data']['seatData']
        res_ticket_price = request.data['payload']['seat_data']['seatData']['totalPrice']
        res_no_of_seat = request.data['payload']['seat_data']['seatData']['selectedSeatCount']
        res_seat_number = request.data['payload']['seat_data']['seatData']['seatNumber']
        res_booking_status = request.data['payload']['seat_data']['seatData']['booking_status']
       
        #get passenger Data
        res_passenger_name = request.data['payload']['passenger_data']['name']
        res_passenger_mobile_number = request.data['payload']['passenger_data']['mobileNumber']
        res_passenger_gender = request.data['payload']['passenger_data']['gender']
        res_passenger_age = request.data['payload']['passenger_data']['age']

        get_user_data = UserAccount.objects.get(pk=res_user_id)
        #split seat number and add passenger data
        converted_seat_number = ""
        passenger_data_arr = []
        for i in range(1, len(res_seat_number)+1):
            #get passenger fields values from passenger data
            passenger_data_arr.append({'name':res_passenger_name['name_'+str(i)], 'mobile_number': res_passenger_mobile_number['mobileNumber_'+str(i)],'gender': res_passenger_gender['gender_'+str(i)], 'age':res_passenger_age['age_'+str(i)]})
        
        for seat in res_seat_number:
            converted_seat_number = converted_seat_number + ',' + str(seat)


        c_str = converted_seat_number[1:]
        boarding_point_res_data = request.data['payload']['seat_data']['point']['boardingPointRadio']['name']
        dropping_point_res_data = request.data['payload']['seat_data']['point']['droppingPointRadio']['name']

        #save ticket data
        get_user_data = UserAccount.objects.get(pk=res_user_id)
        get_trip_schedule = Tripschedule.objects.get(pk=res_trip_schedule_id)
        ticket_serializer = Ticket(ticket_number = ticket_number, total_amount = res_ticket_price, number_of_seats = res_no_of_seat, seat_no = c_str, boarding_point = boarding_point_res_data, dropping_point = dropping_point_res_data, trip_schedule_id = get_trip_schedule, user = get_user_data, booked = res_booking_status)
        ticket_serializer.save()

        #save user info
        get_last_saved_ticket = Ticket.objects.get(ticket_number = ticket_number)
        for data in passenger_data_arr:
            passenger_serializer = UserInfo(user = get_user_data, ticket_number= ticket_number, name = data['name'], mobile_number = data['mobile_number'], gender = data['gender'], age = data['age'], ticket = get_last_saved_ticket)
            passenger_serializer.save()

        #save seat
        get_bus_instance = Bus.objects.get(pk = res_bus_id)
        seat_serializer = Seat(seat_no = c_str, bus_no = get_bus_instance, ticket_id = get_last_saved_ticket)
        seat_serializer.save()
        return Response(data = "success",status=status.HTTP_201_CREATED)
        # return Response(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReservedSeatView(generics.ListAPIView):
    serializer_class = SeatSerializer
    def get_queryset(self):
        bus_id = self.kwargs['bus_id']
        return Seat.objects.filter(bus_no=bus_id)

class ManageBookingView(generics.ListAPIView):
    serializer_class = UserInfoSerializer
    def get_queryset(self):
        user_id = self.kwargs['user']
        user_data = UserInfo.objects.filter(user__id__contains = user_id)
        return user_data

# @api_view(['GET', 'PUT', 'DELETE'])
def cancel_booking_view(request, ticket_id):
    ticket_data = Seat.objects.filter(ticket_id=ticket_id)
    ticket_data.delete()
    # update ticket Status
    ticket_data = Ticket.objects.get(id = ticket_id)
    ticket_data.booked = False
    ticket_data.canceled = True
    ticket_data.save()
    return Response("Booking Cancelled Successfully.", status=status.HTTP_404_OK)
