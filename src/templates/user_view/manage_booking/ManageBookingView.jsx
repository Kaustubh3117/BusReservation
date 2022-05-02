import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../environment/development";
import { Card } from "primereact/card";
import { Button } from "primereact/button"
import cloneDeep from 'lodash'
export const ManageBooking = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const AuthenticatedUserId = useSelector((state) => state.auth.user !== null ? state.auth.user.id : null);
  const [ticketData, setTicketData] = useState({ ticketData: null })
  const [passengerData, setPassengerData] = useState({ passengerData: null })


  useEffect(() => {
    if (AuthenticatedUserId !== null) {
      axios
        .get(
          `${backendUrl}/api/manage_booking/${AuthenticatedUserId}`
        )
        .then(function (response) {
          const data = response.data
          setPassengerData(data)
          // let ticketNumber = null
          let newRsData = []
          let count = 0
          data.map((ele, index) => {
            // ticketNumber = ele.ticket_number
            count++
            const addTicketNumber = {}
            if (data[index - 1]?.ticket_number !== ele.ticket_number && count > 1) {
              addTicketNumber['ticketData'] = { ...ele.ticket }
              addTicketNumber['ticketNumber'] = ele.ticket_number
              newRsData.push(addTicketNumber)
            }
            else if (count === 1) {
              addTicketNumber['ticketData'] = { ...ele.ticket }
              addTicketNumber['ticketNumber'] = ele.ticket_number
              newRsData.push(addTicketNumber)
            }
          })
          setTicketData(newRsData)

        })
    }
  }, [AuthenticatedUserId, isAuthenticated])


  const onCancelBookingClick = (ticket_id) =>{
    axios
    .get(
      `${backendUrl}/api/cancel_booking_view/${ticket_id}`
    )
    .then(function (response) {
    }
    )
  }


  return (
    <>
      {
        Array.isArray(ticketData) && ticketData.length > 0 ?
          ticketData.map((data) => {
            return (
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
                          <li className="text-xl font-medium">{data.ticketData.trip_schedule_id.bus_id.bus_name}</li>
                          <li>From : {data.ticketData.boarding_point}</li>
                          <li>{data.ticketData.trip_schedule_id.bus_id.bus_type}</li>
                        </ul>

                        {
                          passengerData.map((pEle) => {
                            return (
                              pEle.ticket_number === data.ticketNumber ?

                                <>
                                  <ul style={{ listStyleType: "none" }}>
                                    <li>name: {pEle.name}</li>
                                    <li>age: {pEle.age} Rs</li>
                                    <li>Gender: {pEle.gender}</li>
                                    <li>Number: {pEle.mobile_number}</li>
                                  </ul>
                                </>
                                : null
                            )
                          })
                        }
                      </div>

                      <div className="col-3">
                        <ul style={{ listStyleType: "none" }}>
                          <li>To: {data.ticketData.dropping_point}</li>
                          <li>Departure time: {data.ticketData.departure_time} P.M</li>
                          <li>Arrival time: {data.ticketData.arrival_time} P.M</li>
                          <li>Time: {data.ticketData.trip_schedule_id.journey_time} Hrs</li>
                        </ul>
                      </div>

                      <div className="col-3">

                        <ul style={{ listStyleType: "none" }}>
                          <li>Date: {data.ticketData.trip_schedule_id.trip_date}</li>
                          <li>INR: {data.ticketData.total_amount} Rs</li>
                          <li>Bus No: {data.ticketData.trip_schedule_id.bus_id.bus_no}</li>
                          <li>Number of Seats: {data.ticketData.number_of_seats}</li>
                          <li>Seat Number: {data.ticketData.seat_no}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <Button type="submit" label="View Details" />
                <Button type="Button
                " label="Cancel Booking" className="p-button-danger" onClick={(e)=>{onCancelBookingClick(data.ticketData.id)}} />
              </Card>
            )
          })
          : null
      }
    </>
  )
}

