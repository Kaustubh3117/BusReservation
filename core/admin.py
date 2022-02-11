from django.contrib import admin
from .models import (Bus, Tripschedule, Ticket, BoardingPoint, DroppingPoint, Seat, UserInfo, Payment)


class TicketAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'total_amount',
        'seat_no',
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


# Register your models here.
admin.site.register(Bus)
admin.site.register(Tripschedule)
admin.site.register(BoardingPoint, BoardingPointAdmin)
admin.site.register(DroppingPoint, DroppingPointAdmin)
admin.site.register(Seat)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(UserInfo)
admin.site.register(Payment)