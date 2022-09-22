import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SideBar } from "./assets/SideBar";
import { Steps } from 'primereact/steps';
import { BusView } from "./components/bus/BusView";
import {TripScheduleView} from './components/trip_schedule/TripScheduleView';
import {BoardingDroppingPoint} from './components/boarding_dropping_point/BoardingDroppingPointView';

export const AgentView = () => {
    const isAgent = useSelector((state) => state?.auth?.user?.is_agent)
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (isAgent === undefined || !isAgent) {
    //         window.location.href="/"
    //     }
    // }, [isAgent])

    const items = [
        {
            label: 'Bus',
        },
        {
            label: 'Trip Schedule',
        },
        {
            label: 'Boarding/Dropping Point',
        },
    ];



    return (
        <>
            <div className='grid'>
                <div className='col-3'>
                    <SideBar />
                </div>
                <div className='col-9' style={{marginLeft:'-80px'}}>
                <div className="mt-6">
                    <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />    

                    <div className="mt-6">
                    {activeIndex === 0? <BusView/> :<></>}    
                    {activeIndex === 1? <TripScheduleView/>:<></>}
                    {activeIndex === 2? <BoardingDroppingPoint/>:<></>}
                    </div>
                 
                    </div>

                        
                </div>
            </div>
        </>
    )
}