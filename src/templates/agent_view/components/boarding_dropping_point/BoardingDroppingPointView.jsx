import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GridView } from '../../../common/grid_view/GridView';
import { boardingDataTableColums, boardingPointFields, droppingDataTableColums, droppingPointFields } from './components/BoardingDroppingPointFields';
import { backendUrl } from '../../../../environment/development';
import { SideBar } from '../../assets/SideBar';
import { TabView, TabPanel } from 'primereact/tabview';
export const BoardingDroppingPoint = () => {
    const [activeIndex1, setActiveIndex1] = useState(1);
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
            {/* <div className='grid'>
                <div className='col-3'>
                    <SideBar />
                </div>
                <div className='col-9'> */}
                 <TabView>
                    <TabPanel header="Boarding Point">
                    <GridView columns={boardingDataTableColums} data={boardingPoint} formFields={boardingPointFields} />
                    </TabPanel>
                    <TabPanel header="Dropping Point">
                    <GridView columns={droppingDataTableColums} data={droppingPoint} formFields={droppingPointFields} />
                    </TabPanel>
                </TabView>


                {/* </div>
            </div> */}
        </>
    );
}