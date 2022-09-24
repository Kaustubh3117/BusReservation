
export const dataTableColums = [{
    field: "id",
    header: "id",
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
    sortable: false,
    body: ''
},
{
    field: "bus_no",
    header: "Bus No.",
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
    field: "journey_time",
    header: "Journey Time",
    sortable: true,
    body: ''
},
{
    field: "trip_date",
    header: "Date",
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
    field: "status",
    header: "Status",
    sortable: true,
    body: ''
}
]


export const tripScheduleFields = (dropDownVals)=>{
    const data =  [
        {
            id:"trip_date",
            name: "trip_date",
            label:"Trip Date",
            fieldType: "date",
            value:'',
            errorMessage: 'Please Enter Trip Date'
        },
        {
            id:"departure_time",
            name: "departure_time",
            label:"Departure Time",
            fieldType: "time",
            value:'',
            errorMessage: 'Please Enter Trip Date'
        },
        {
            id:"arrival_time",
            name: "arrival_time",
            label:"Arrival Time",
            fieldType: "time",
            value:'',
            errorMessage: 'Please Enter Trip Date'
        },
        {
            id:"available_seat",
            name: "available_seat",
            label:"Available Seat",
            fieldType: "number",
            errorMessage: 'Please Enter Trip Date'
        },
        {
            id:"journey_time",
            name: "journey_time",
            label:"Journey Time",
            fieldType: "text",
            errorMessage: 'Please Enter Trip Date'
        },
        {
            id:"price",
            name: "price",
            label:"Price",
            fieldType: "number",
            errorMessage: 'Please Enter Trip Date'
        },
        {
            id:"bus_id",
            name: "bus_id",
            label:"Select Bus",
            fieldType: "select",
            dropDownValues:dropDownVals,
            errorMessage: 'Please Enter Trip Date'
        },
    ]
    return data
}