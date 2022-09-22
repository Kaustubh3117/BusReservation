import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useSelector} from 'react-redux'
import { GridView } from '../../../common/grid_view/GridView';
import { dataTableColums, busFields } from './components/BusFields';
import { backendUrl } from '../../../../environment/development';
import { SideBar } from '../../assets/SideBar'
export const BusView = () => {
    const agentId = useSelector(state => state?.auth?.user?.id)
    const [data, setData] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    useEffect(() => {
        axios.get(`${backendUrl}/agent_api/bus/`).then(
            function (response) {
                setData(response.data)
            }
        )
    }, [refreshData])

    const onFormSubmitHandler = (values, id)=>{
        values.agent = agentId
        if(id !== null){
            axios.put(`${backendUrl}/agent_api/bus_crud/${id}`, values).then((response)=>{
                setRefreshData(!refreshData)
                        })
                        .catch((error)=>{
                
                        })
        }
        else{
            axios.post(`${backendUrl}/agent_api/bus_crud/`, values).then((response)=>{
                setRefreshData(!refreshData)
                        })
                        .catch((error)=>{
                
                        })
        } 
    }

    return (
        <>
            {/* <div className='grid'> */}
                {/* <div className='col-3'> */}
                    {/* <SideBar /> */}
                {/* </div> */}
                {/* <div className='col-9'> */}
                <h1>Manage bus</h1>
                    <GridView columns={dataTableColums} data={data} formFields={busFields} onFormSubmitHandler ={onFormSubmitHandler}/>
                {/* </div> */}
            {/* </div> */}
        </>
    );
}