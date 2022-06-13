import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GridView } from '../../../common/grid_view/GridView';
import { boardingDataTableColums, boardingPointFields, droppingDataTableColums, droppingPointFields } from './components/BoardingDroppingPointFields';
import { backendUrl } from '../../../../environment/development';
import { SideBar } from '../../assets/SideBar'
export const BoardingDroppingPoint = () => {

    const [boardingPoint, setBoardingPoint] = useState([])
    const [droppingPoint, setDroppingPoint] = useState([])
    useEffect(() => {
        axios.get(`${backendUrl}/agent_api/boading_point/`).then(
            function (response) {
                setBoardingPoint(response.data)
            }
        )
    }, [])

    useEffect(() => {
        axios.get(`${backendUrl}/agent_api/dropping_point/`).then(
            function (response) {
                setDroppingPoint(response.data)
            }
        )
    }, [])

    return (
        <>
            <div className='grid'>
                <div className='col-3'>
                    <SideBar />
                </div>
                <div className='col-9'>
                    <GridView title={"Manage Boarding Point"} columns={boardingDataTableColums} data={boardingPoint} formFields={boardingPointFields} />

                    <GridView title={"Manage Dropping Point"} columns={droppingDataTableColums} data={droppingPoint} formFields={droppingPointFields} />

                </div>
            </div>
        </>
    );
}