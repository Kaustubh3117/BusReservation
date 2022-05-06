import { Rating } from 'primereact/rating';

// const imageBodyTemplate = (rowData) => {
//     return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
// }
// const ratingBodyTemplate = (rowData) => {
//     return <Rating value={rowData.rating} readOnly cancel={false} />;
// }
// const statusBodyTemplate = (rowData) => {
//     return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
// }
export const dataTableColums = [{
    field: "id",
    header: "id",
    sortable: true
},
{
    field: "bus_id.image",
    header: "Image",
    sortable: true
},
{
    field: "bus_id.bus_name",
    header: "Bus",
    sortable: false,
    body: ''
},
{
    field: "bus_id.bus_no",
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


export const tripScheduleFields = [
    {
        id:"trip_date",
        name: "trip_date",
        label:"Trip Date",
        fieldType: "InputText",
        value:'',
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"departure_time",
        name: "departure_time",
        label:"Departure Time",
        fieldType: "InputText",
        value:'',
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"arrival_time",
        name: "arrival_time",
        label:"Arrival Time",
        fieldType: "InputText",
        value:'',
        errorMessage: 'Please Enter Trip Date'
    },
    {
        id:"available_seat",
        name: "available_seat",
        label:"Available Seat",
        fieldType: "InputNumber",
        errorMessage: 'Please Enter Trip Date'
    },
]