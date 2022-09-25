
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
    header: "Boarding/Dropping Point",
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
