import React, {useEffect, useState} from 'react';
import { backendUrl } from '../../../../environment/development';
import { GridView } from '../../../common/grid_view/GridView';
import { dataTableColums, tripScheduleFields } from './components/TripScheduleFields';
import axios from "axios";
import {SideBar} from '../../assets/SideBar';

export const TripScheduleView = () => {
    const[data, setData] = useState([])
    useEffect(()=>{
        axios.get(`${backendUrl}/agent_api/tripschedule/`).then(
            function (response) {
                 setData(response.data)
              }
        )
    }, [])

    return (
        <>
            {/* <div className='grid'> */}
                {/* <div className='col-3'>
                    <SideBar />
                </div>
                <div className='col-9'> */}
                <GridView  columns={dataTableColums} data={data} formFields={tripScheduleFields} />
                {/* </div> */}
            {/* </div> */}
        </>
    );
}