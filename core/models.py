from django.db import models
from BusReservation import settings

class Bus(models.Model):
    bus_name = models.CharField(max_length=50)
    bus_no = models.CharField(max_length=50)
    capacity = models.IntegerField(default=48)
    bus_type = models.CharField(max_length=50, default="Seater", null=True)
    image = models.ImageField()
    agent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.bus_name


class Tripschedule(models.Model):
    trip_date = models.DateField()
    departure_time = models.CharField(max_length=20, null=True, blank=True)
    arrival_time = models.CharField(max_length=20, null=True, blank=True)
    available_seat = models.IntegerField(default=48, null=True)
    ticket_sold = models.IntegerField(default=0, null=True)
    price = models.FloatField()
    journey_time = models.CharField(max_length=25, null=True)
    bus_id = models.ForeignKey(Bus, on_delete=models.SET_NULL, null=True, related_name='bus')
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.bus_id.bus_name


class Ticket(models.Model):
    ticket_number = models.CharField(max_length=100, null=True)
    total_amount = models.FloatField(default=0.0)
    number_of_seats = models.IntegerField(default=0)
    seat_no = models.CharField(max_length=100, null=True, blank=True)
    boarding_point = models.CharField(max_length=50, null=True)
    dropping_point = models.CharField(max_length=50, null=True)
    trip_schedule_id = models.ForeignKey(Tripschedule, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    booked = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)

    def __str__(self):
        return self.seat_no


class BoardingPoint(models.Model):
    pick_location = models.CharField(max_length=50, null=True)
    trip_schedule_id = models.ForeignKey(Tripschedule, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.pick_location


class DroppingPoint(models.Model):
    drop_location = models.CharField(max_length=50, null=True)
    trip_schedule_id = models.ForeignKey(Tripschedule, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.drop_location


class Seat(models.Model):
    seat_no = models.CharField(max_length=100, null=True, blank=False)
    bus_no = models.ForeignKey(Bus, on_delete=models.SET_NULL, null=True)
    ticket_id = models.ForeignKey(Ticket, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.seat_no)


class Payment(models.Model):
    payment_id = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    ticket_number = models.CharField(max_length=100, null=True, blank=False)
    refund_issued = models.BooleanField(default=False)
    refunded = models.BooleanField(default=False)
    timestamp = models.DateTimeField(editable=True, auto_now_add=True)

    def __str__(self):
        return self.user.email

class UserInfo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, null=True)
    ticket_number = models.CharField(max_length=100, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    mobile_number = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    age = models.IntegerField()
    ticket = models.ForeignKey(Ticket, on_delete=models.SET_NULL, null=True)


    def __str__(self):
        return self.name
