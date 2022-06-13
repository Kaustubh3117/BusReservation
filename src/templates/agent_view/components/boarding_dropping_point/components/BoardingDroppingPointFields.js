
//Boarding Point fields
export const boardingDataTableColums = [{
    field: "id",
    header: "id",
    sortable: true
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
}
]


export const boardingPointFields = [
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
        errorMessage: 'Please Select Trip Schedule'
    },
]

//dropping point fields
export const droppingDataTableColums = [{
    field: "id",
    header: "id",
    sortable: true
},

{
    field: "drop_location",
    header: "Drop Location",
    sortable: true
},
{
    field: "trip_schedule_id",
    header: "Trip Schedule",
    sortable: false,
    body: ''
}
]

export const droppingPointFields = [
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
        id:"i",
        name: "trip_schedule_id",
        label:"Trip Schedule.",
        fieldType: "select",
        errorMessage: 'Please Select Trip Schedule'
    },
]