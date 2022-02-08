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


# Register your models here.
admin.site.register(Bus)
admin.site.register(Tripschedule)
admin.site.register(BoardingPoint)
admin.site.register(DroppingPoint)
admin.site.register(Seat)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(UserInfo)
admin.site.register(Payment)