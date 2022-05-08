import React, {useEffect, useState} from 'react';
import axios from "axios";
import { GridView } from '../../../common/grid_view/GridView';
import { dataTableColums, busFields } from './components/BusFields';
import { backendUrl } from '../../../../environment/development';
export const BusView = () => {

    const[data, setData] = useState([])
    useEffect(()=>{
        axios.get(`${backendUrl}/agent_api/bus/`).then(
            function (response) {
                 setData(response.data)
              }
        )
    }, [])

    console.log("bus data...", data)
    return (
        <>
            <GridView title={"Manage bus"} columns={dataTableColums} data={data}  formFields={busFields}  />
        </>
    );
}