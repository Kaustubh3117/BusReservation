import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SideBar } from "../../assets/SideBar";
import { Steps } from 'primereact/steps';
import { BusView } from "../bus/BusView";
import { TripScheduleView } from "../trip_schedule/TripScheduleView";
// import { BoardingDroppingPoint } from "../../../user_view/components/seat_booking/components/BoardingDroppingPoint";
import { BoardingDroppingPointView } from "../boarding_dropping_point/BoardingDroppingPointView";

export const BusStatusView = () => {
    const isAgent = useSelector((state) => state?.auth?.user?.is_agent)
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        if (isAgent === undefined || !isAgent) {
            navigate('/login')
        }
    }, [isAgent])

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
                    {activeIndex === 2? <BoardingDroppingPointView/>:<></>}
                    </div>
                    </div>

                        
                </div>
            </div>
        </>
    )
}