
export const dataTableColums = [{
    field: "id",
    header: "id",
    sortable: true
},
{
    field: "image",
    header: "Image",
    sortable: true,
    body: ''
},
{
    field: "bus_name",
    header: "Name",
    sortable: true
},
{
    field: "bus_no",
    header: "Bu No.",
    sortable: false,
    body: ''
},
{
    field: "capacity",
    header: "Capacity",
    sortable: true
},
{
    field: "bus_type",
    header: "Type",
    sortable: true
},
]


export const busFields = [
    {
        id:"image",
        name: "image",
        label:"Image",
        fieldType: "fileupload",
        value:'',
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"bus_name",
        name: "bus_name",
        label:"Name",
        fieldType: "text",
        value:'',
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"bus_no",
        name: "bus_no",
        label:"Bus No.",
        fieldType: "text",
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"capacity",
        name: "capacity",
        label:"Capacity",
        fieldType: "number",
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"bus_type",
        name: "bus_type",
        label:"Bus Type",
        fieldType: "select",
        errorMessage: 'Please Enter Trip Date'
    },
]