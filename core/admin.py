from django.contrib import admin
from .models import (Bus, Tripschedule, Ticket, BoardingPoint, DroppingPoint, Seat, PassengerInfo, Payment)


class TicketAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'total_amount',
        'ticket_number',
        'seat_no',
        'boarding_point',
        'dropping_point',
        'booked',
        'canceled',

    ]
    search_fields = [
        'user',
        'total_amount',
        'seat_no',
    ]

class BoardingPointAdmin(admin.ModelAdmin):
    list_display = [
        'pick_location',
        'trip_schedule_id',
    ]

class DroppingPointAdmin(admin.ModelAdmin):
    list_display = [
        'drop_location',
        'trip_schedule_id',
    ]


class TripScheduleAdmin(admin.ModelAdmin):
    list_display = [
        'bus_id',
        'trip_date',
        'departure_time',
        'arrival_time',
        'available_seat',
        'ticket_sold',
        'price',
        'journey_time',
        'status'
    ]
    list_filter = ['bus_id', 'trip_date', 'departure_time','arrival_time','ticket_sold', 'status']
    search_fields = ['bus_id', 'trip_date', 'departure_time', 'arrival_time','ticket_sold','status']


# Register your models here.
admin.site.register(Bus)
admin.site.register(Tripschedule, TripScheduleAdmin)
admin.site.register(BoardingPoint, BoardingPointAdmin)
admin.site.register(DroppingPoint, DroppingPointAdmin)
admin.site.register(Seat)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(PassengerInfo)
admin.site.register(Payment)