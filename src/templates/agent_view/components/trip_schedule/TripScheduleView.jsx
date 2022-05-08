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
console.log("trip schedule data...", data)
    return (
        <>
            <GridView title={"Manage bus"} columns={dataTableColums} data={data} formFields={tripScheduleFields} />
        </>
    );
}