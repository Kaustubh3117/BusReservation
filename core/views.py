import random
import string
import razorpay
import re

from re import I
from django.shortcuts import render
from rest_framework import generics
from django.core.mail import send_mail
from .serializers import BoardingPointSerializer, DroppingPointSerializer, SeatSerializer, TicketSerializer, TripscheduleSerializer, PassengerInfoSerializer
from .models import BoardingPoint, DroppingPoint, Ticket, Tripschedule, PassengerInfo, Seat, Bus, Payment
from accounts.models import UserAccount
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import  renderer_classes
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.conf import settings


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
        coverted_trip_date = trip_date.replace('-', '/')

       

        #get dropping point
        dropping_list = DroppingPoint.objects.filter(
            Q(drop_location__icontains=dropping_point)
        )
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

        object_list = self.queryset.filter(Q(pk__in=boarding_trip_schedule_id) & Q(pk__in=dropping_trip_schedule_id) & Q(trip_date=coverted_trip_date))
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
        try:
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

            #GET USER DATA
            get_user_data = UserAccount.objects.get(pk=res_user_id)

            #PAYMENT DETAILS
            payment_id = request.data['payload']['payment_data']['order_id']
            payment_amount = request.data['payload']['payment_data']['amount']
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

            #seat count
            get_trip_schedule = Tripschedule.objects.get(pk=res_trip_schedule_id)
            get_trip_schedule.available_seat = get_trip_schedule.available_seat - res_no_of_seat
            get_trip_schedule.save()

            #save ticket data
            get_user_data = UserAccount.objects.get(pk=res_user_id)            
            ticket_serializer = Ticket(ticket_number = ticket_number, total_amount = res_ticket_price, number_of_seats = res_no_of_seat, seat_no = c_str, boarding_point = boarding_point_res_data, dropping_point = dropping_point_res_data, trip_schedule_id = get_trip_schedule, user = get_user_data, booked = res_booking_status)
            ticket_serializer.save()

            #save user info
            get_last_saved_ticket = Ticket.objects.get(ticket_number = ticket_number)
            for data in passenger_data_arr:
                passenger_serializer = PassengerInfo(user = get_user_data, ticket_number= ticket_number, name = data['name'], mobile_number = data['mobile_number'], gender = data['gender'], age = data['age'], ticket = get_last_saved_ticket)
                passenger_serializer.save()

            #save seat
            get_bus_instance = Bus.objects.get(pk = res_bus_id)
            seat_serializer = Seat(seat_no = c_str, bus_no = get_bus_instance, ticket_id = get_last_saved_ticket, trip_schedule_id=get_trip_schedule)
            seat_serializer.save()

            #save payment details
            save_payment_details = Payment(payment_id= payment_id, user = get_user_data, amount = payment_amount, ticket_number=ticket_number)
            save_payment_details.save()
            #send email
            subject = 'Giyobus Booking successfull'
            message = 'Your booking was successfull.'+ '\n' +'Ticket Number:' + ticket_number +'.' + ' ' + 'Bus:' + get_bus_instance.bus_name+'.'+ ' ' + 'Price:' +str(res_ticket_price) + ' ' +'Boarding Point:'+boarding_point_res_data + ' ' +'Dropping Point:'+dropping_point_res_data
            from_email = settings.EMAIL_HOST_USER
            user_email = get_last_saved_ticket.user
            recipient_list =  [user_email, 'kaustubh3117@gmail.com']
            send_mail_function(subject,message,from_email,recipient_list)
            
            return Response(status=HTTP_200_OK)
        except:
            return Response(status="Something went wrong. Please contact admin")

class PaymentView(APIView):
    def post(self, request, format=None):
         #razorpay
        global client
        client = razorpay.Client(auth=("rzp_test_0byzGAVeUBt6CU", "N6J9PAxwcQIDlxID0CwCL4K5"))
        res_total_price = request.data['amount']
        razorpay_converted_amount = float(res_total_price) * 100
        data = {"amount" : razorpay_converted_amount, "currency" : "INR"}
        payment = client.order.create(data=data)
        return_res_data = {'order_id': payment['id'], 'amount': payment['amount'], 'currency':payment['currency']}
        return Response(return_res_data, status=HTTP_200_OK)

class VerifySignatureView(APIView):
    def post(self, request, format=None):
        res = request.data
        params_dict = {
            'razorpay_payment_id' : res['razorpay_paymentId'],
            'razorpay_order_id' : res['razorpay_orderId'],
            'razorpay_signature' : res['razorpay_signature']
        }
        res = client.utility.verify_payment_signature(params_dict)

        if res == True:
            return Response({'status':'Payment Successful'})
        return Response({'status':'Payment Failed'})

class ReservedSeatView(generics.ListAPIView):
    serializer_class = SeatSerializer
    def get_queryset(self):
        bus_id = self.kwargs['bus_id']
        return Seat.objects.filter(bus_no=bus_id)

class ManageBookingView(generics.ListAPIView):
    serializer_class = PassengerInfoSerializer
    def get_queryset(self):
        user_id = self.kwargs['user']
        user_data = PassengerInfo.objects.filter(user__id__contains = user_id)[::-1]
        return user_data

class CancelBookingView(APIView):
    def post(self, request, ticket_id):
        tick_id = ticket_id
        seat_data = Seat.objects.filter(ticket_id=tick_id)
        seat_data.delete()
        # update ticket Status
        ticket_data = Ticket.objects.get(id = tick_id)
        ticket_data.booked = False
        ticket_data.canceled = True
        ticket_data.save()
        #update payment data 
        payment_details = Payment.objects.get(ticket_number = ticket_data.ticket_number)
        payment_details.refund_issued = True
        payment_details.save()
        #send email
        
        subject = 'Giyobus Booking Cancelled'
        message = 'Your booking was Cancelled.'+'Ticket Details:' + str(tick_id) +'.'
        from_email = settings.EMAIL_HOST_USER
        user_email = ticket_data.user
        recipient_list =  [user_email, 'kaustubh3117@gmail.com']
        send_mail_function(subject,message,from_email,recipient_list)
        return Response(None, status=HTTP_200_OK)

class TicketView(generics.ListAPIView):
    serializer_class = PassengerInfoSerializer
    def get_queryset(self):
        ticket_id = self.kwargs['ticket_id']
        if ticket_id != None and ticket_id != '':
            passenger_data = PassengerInfo.objects.filter(ticket_number = ticket_id)
            return passenger_data
        else:
            return Response(None, "No Ticket Found")

class SeatStatusView(APIView):
    def post(self, request):
        request_payload = request.data
        trip_schedule_id = request_payload['tripScheduleId']
        selected_seats = request_payload['seatNumber']
        filtered_seats_arr = []
        filtered_seat_data = Seat.objects.filter(trip_schedule_id = trip_schedule_id)
        print("filtered data....",filtered_seat_data)
        for filtered_seats_str in filtered_seat_data:
            if len(filtered_seats_str.seat_no) == 1:
                filtered_seats_arr.append(filtered_seats_str.seat_no)
            elif len(filtered_seats_str.seat_no) > 1:
                seat_str_arr = filtered_seats_str.seat_no.split(',')
                for st_str in seat_str_arr:
                    filtered_seats_arr.append(st_str)
        response_data = []
        for seat_d in selected_seats:
            for seat in filtered_seats_arr:
                if str(seat_d) == seat:
                    response_data.append(seat_d)
        if response_data:
             return Response({'status':'true'})
        return Response({'status':'false'})

def send_mail_function(subject, message, from_email, recipient_list):
    send_mail(
        subject,
        message,
        from_email,
        recipient_list,
        fail_silently=False,
    )
            


