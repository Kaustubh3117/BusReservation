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
        let form_data = new FormData();
        if (typeof values.image === 'object')
            form_data.append("image", values.image, values.image.name);
        form_data.append("id", values.id);
        form_data.append("bus_name", values.bus_name);
        form_data.append("bus_no", values.bus_no);
        form_data.append("bus_type", values.bus_type);
        form_data.append("capacity", values.capacity);
        form_data.append("agent", values.agent);
        if(id !== null){
            axios.put(`${backendUrl}/agent_api/bus_crud/${id}`, form_data,{headers: {
                'content-type': 'multipart/form-data'
              }}).then((response)=>{
                setRefreshData(!refreshData)
                        })
                        .catch((error)=>{
                
                        })
        }
        else{
            axios.post(`${backendUrl}/agent_api/bus_crud/`, form_data, {headers: {
                'content-type': 'multipart/form-data'
              }}).then((response)=>{
                setRefreshData(!refreshData)
                        })
                        .catch((error)=>{
                
                        })
        } 
    }

    const deleteClickHandler = (selectedRowData) =>{
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };
          const deletePayload = [];
          for (const i in selectedRowData) {
            console.log("i...", i);
            deletePayload.push(selectedRowData[i].id);
          }
          const finalPayload = { data: deletePayload };
          axios
            .post(`${backendUrl}/agent_api/delete_bus/`, finalPayload, config)
            .then((response)=> {
                setRefreshData(!refreshData)
                alert('data deleted')
            });
    }

    return (
        <>
            {/* <div className='grid'> */}
                {/* <div className='col-3'> */}
                    {/* <SideBar /> */}
                {/* </div> */}
                {/* <div className='col-9'> */}
                <h1>Manage bus</h1>
                    <GridView columns={dataTableColums} data={data} formFields={busFields} onFormSubmitHandler ={onFormSubmitHandler} onDeleteClickHandler ={deleteClickHandler}/>
                {/* </div> */}
            {/* </div> */}
        </>
    );
}