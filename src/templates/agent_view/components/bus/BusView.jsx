import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GridView } from '../../../common/grid_view/GridView';
import { dataTableColums, busFields } from './components/BusFields';
import { backendUrl } from '../../../../environment/development';
import { SideBar } from '../../assets/SideBar'
export const BusView = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`${backendUrl}/agent_api/bus/`).then(
            function (response) {
                setData(response.data)
            }
        )
    }, [])

    return (
        <>
            {/* <div className='grid'> */}
                {/* <div className='col-3'> */}
                    {/* <SideBar /> */}
                {/* </div> */}
                {/* <div className='col-9'> */}
                <h1>Manage bus</h1>
                    <GridView columns={dataTableColums} data={data} formFields={busFields} />
                {/* </div> */}
            {/* </div> */}
        </>
    );
}