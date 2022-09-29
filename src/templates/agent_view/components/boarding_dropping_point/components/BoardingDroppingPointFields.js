
//Boarding Point fields
export const boardingDataTableColums = [{
    field: "id",
    header: "id",
    sortable: true
},
{
    field: "bus_no",
    header: "Bus No.",
    sortable: true,
    body: ''
},
{
    field: "pick_location",
    header: "Pick Location",
    sortable: true
},
{
    field: "trip_schedule_id",
    header: "Trip Schedule",
    sortable: false,
    body: ''
},
{
    field: "bus_name",
    header: "Bus",
    sortable: true,
    body: ''
},
{
    field: "bus_type",
    header: "Bus Type",
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
    field: "arrival_time",
    header: "Arrival Time",
    sortable: true,
    body: ''
},
{
    field: "departure_time",
    header: "Departure Time",
    sortable: true,
    body: ''
},
]


export const boardingPointFields = (dropDownVals)=>{
const fields =[
    {
        id:"id",
        name: "id",
        label:"id",
        fieldType: "",
        value:'',
        errorMessage: ''
    },
    {
        id:"pick_location",
        name: "pick_location",
        label:"Pick Location",
        fieldType: "text",
        value:'',
        errorMessage: 'Please Enter Pick Location'
    },
    {
        id:"i",
        name: "trip_schedule_id",
        label:"Trip Schedule.",
        fieldType: "select",
        dropDownValues:dropDownVals,
        errorMessage: 'Please Select Trip Schedule'
    },
]
return fields
} 

//dropping point fields
export const droppingDataTableColums =  [{
    field: "id",
    header: "id",
    sortable: true
},
{
    field: "bus_name",
    header: "Bus",
    sortable: true,
    body: ''
},
{
    field: "drop_location",
    header: "Drop Location",
    sortable: true
},
{
    field: "trip_schedule_id",
    header: "Trip Schedule",
    sortable: true,
    body: ''
},
{
    field: "bus_type",
    header: "Bus Type",
    sortable: true,
    body: ''
},
{
    field: "bus_no",
    header: "Bus No.",
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
    field: "arrival_time",
    header: "Arrival Time",
    sortable: true,
    body: ''
},
{
    field: "departure_time",
    header: "Departure Time",
    sortable: true,
    body: ''
},
]


export const droppingPointFields = (dropDownVals)=>{ 
    const fields = [
    {
        id:"id",
        name: "id",
        label:"id",
        fieldType: "",
        value:'',
        errorMessage: ''
    },
    {
        id:"drop_location",
        name: "drop_location",
        label:"Drop Location",
        fieldType: "text",
        value:'',
        errorMessage: 'Please Enter Drop Location'
    },
    {
        id:"trip_schedule_id",
        name: "trip_schedule_id",
        label:"Trip Schedule.",
        fieldType: "select",
        dropDownValues:dropDownVals,
        errorMessage: 'Please Select Trip Schedule'
    },
]
return fields
}