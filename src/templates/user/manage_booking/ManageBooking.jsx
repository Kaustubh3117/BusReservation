import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../environment/development";
import { Card } from "primereact/card";
import {Button} from "primereact/button"
import cloneDeep from 'lodash'
export const ManageBooking = () =>{
    const AuthenticatedUserId = useSelector((state) => state.auth.user!==null?state.auth.user.id:null);
    const [ticketData, setTicketData] = useState({ticketData:null})
    console.log("user id", AuthenticatedUserId)
    useEffect(() => {
       if(AuthenticatedUserId !== null){
        axios
        .get(
          `${backendUrl}/api/manage_booking/${AuthenticatedUserId}`
        )
        .then(function (response) {
          const data = cloneDeep(response.data);
          console.log('Ticket data...', response)
          console.log('Ticket data ***...', response.data)
          setTicketData(response.data)
        })
       }
       
    }, [])

    return(
        <>
        {
          Array.isArray(ticketData) && ticketData.length>0 ?
          ticketData.map((data)=>{
            return(
              <Card className="shadow-5 mt-4" style={{ width: "100%" }}>
              <div className="grid">
                <div className="col-2">
                  <img
                    src=''
                    className="mobile_image"
                    height="100px"
                    width="100px"
                    alt="img"
                  />
                </div>
                <div className="col-10">
                  <div className="grid">
                    <div className="col-3">
                  
                      <ul style={{ listStyleType: "none" }}>
                        <li className="text-xl font-medium">{data.trip_schedule_id.bus_id.bus_name}</li>
                        <li>From : {data.boarding_point}</li>
                        <li>{data.trip_schedule_id.bus_id.bus_type}</li>
                        <li>Amenities</li>
                      </ul>
                    </div>
      
                    <div className="col-3">
                    
                      <ul style={{ listStyleType: "none" }}>
                        <li>To: {data.dropping_point}</li>
                        <li>Departure time: {data.departure_time} P.M</li>
                        <li>Arrival time: {data.arrival_time} P.M</li>
                        <li>Time: {data.trip_schedule_id.journey_time} Hrs</li>
                      </ul>
                    </div>
      
                    <div className="col-3">
                    
                      <ul style={{ listStyleType: "none" }}>
                        <li>Date: {data.trip_schedule_id.trip_date}</li>
                        <li>INR: {data.total_amount} Rs</li>
                        <li>Bus No: {data.trip_schedule_id.bus_id.bus_no}</li>
                        <li>Number of Seats: {data.number_of_seats}</li>
                        <li>Seat Number: {data.seat_no}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
<Button  type="submit" label="View Details" />
<Button  type="submit" label="Cancel Booking" className="p-button-danger"/>
            </Card>
            )
           
          })
         :null
        }
      
        </>
    )
}