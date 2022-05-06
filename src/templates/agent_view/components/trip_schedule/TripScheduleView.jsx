import React, {useEffect, useState} from 'react';
import { backendUrl } from '../../../../environment/development';
import { GridView } from '../../../common/grid_view/GridView';
import { dataTableColums, tripScheduleFields } from './components/TripScheduleFields';
import axios from "axios"

export const TripScheduleView = () => {
    const[data, setData] = useState([])
    useEffect(()=>{
        axios.get(`${backendUrl}/agent_api/tripschedule/`).then(
            function (response) {
                 setData(response.data)
              }
        )
    }, [])

    // const data = [
    //     { "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //     { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Product Description", "image": "blue-t-shirt.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Product Description", "image": "bracelet.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4 },
    //    ]
console.log("trip schedule data...", data)
    return (
        <>
            <GridView title={"Manage bus"} columns={dataTableColums} data={data} formFields={tripScheduleFields} />
        </>
    );
}