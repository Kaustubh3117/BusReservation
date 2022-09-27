
//Boarding Point fields
export const DashBoardColumns = [{
    field: "id",
    header: "Id",
    sortable: true
},
{
    field: "image",
    header: "Image",
    sortable: true
},
{
    field: "bus_name",
    header: "Bus",
    sortable: true
},
{
    field: "bus_no",
    header: "Bus Number",
    sortable: true,
    body: ''
},
{
    field: "bus_type",
    header: "Type",
    sortable: true,
    body: ''
},
{
    field: "capacity",
    header: "Capacity",
    sortable: true,
    body: ''
}
]


export const TripScheduleColumns = [{
    field: "id",
    header: "Id",
    sortable: true
},
{
    field: "trip_date",
    header: "Date",
    sortable: true
},
{
    field: "arrival_time",
    header: "Arrival",
    sortable: true
},
{
    field: "departure_time",
    header: "Departure",
    sortable: true,
    body: ''
},
{
    field: "price",
    header: "Price",
    sortable: true,
    body: ''
},
{
    field: "journey_time",
    header: "Journey Time",
    sortable: true,
    body: ''
},
{
    field: "ticket_sold",
    header: "Ticket Sold",
    sortable: true,
    body: ''
},
{
    field: "bpdp_point",
    header: "View Points",
    sortable: true,
    body: ''
},
{
    field: "tickets",
    header: "Tickets",
    sortable: true,
    body: ''
},
{
    field: "status",
    header: "Status",
    sortable: true,
    body: ''
}
]

export const BoardingColumns = [{
    field: "id",
    header: "Id",
    sortable: true
},
{
    field: "pick_location",
    header: "Pick Location",
    sortable: true
}
]

export const DroppingColumns = [{
    field: "id",
    header: "Id",
    sortable: true
},
{
    field: "drop_location",
    header: "Drop Location",
    sortable: true
}
]

export const TicketColumns = [{
    field: "id",
    header: "Id",
    sortable: true
},
{
    field: "ticket_number",
    header: "Ticket Number",
    sortable: true
},
{
    field: "total_amount",
    header: "Total Amount",
    sortable: true
},
{
    field: "number_of_seats",
    header: "Seats Booked",
    sortable: true
},
{
    field: "seat_no",
    header: "Seat Number",
    sortable: true
},
{
    field: "status",
    header: "Status",
    sortable: true
},
// {
//     field: "canceled",
//     header: "Cancelled",
//     sortable: true
// }
]

export const PasengerColumns = [{
    field: "id",
    header: "Id",
    sortable: true
},
{
    field: "name",
    header: "Name",
    sortable: true
},
{
    field: "mobile_number",
    header: "Mobile Number",
    sortable: true
},
{
    field: "ticket_number",
    header: "Ticket Number",
    sortable: true
},
{
    field: "gender",
    header: "Gender",
    sortable: true
}
]
