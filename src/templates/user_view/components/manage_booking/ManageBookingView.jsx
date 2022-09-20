import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../../environment/development";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { SUCCESS } from "../../../../constants/common/CrudMessageEnum";
import { Badge } from "primereact/badge";

import { ManageTicketView } from "../manage_tickets/ManageTicketView";

export const ManageBooking = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const AuthenticatedUserId = useSelector((state) =>
    state.auth.user !== null ? state.auth.user.id : null
  );
  const [ticketData, setTicketData] = useState({ ticketData: null });
  const [passengerData, setPassengerData] = useState({ passengerData: null });
  const [displayTicketDetialsModal, setDisplayTicketDetialsModal] =
    useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [cancelBookingStatus, setCancelBookingStatus] = useState(false);

  useEffect(() => {
    if (AuthenticatedUserId !== null) {
      axios
        .get(`${backendUrl}/api/manage_booking/${AuthenticatedUserId}`)
        .then(function (response) {
          const data = response.data;
          setPassengerData(data);
          let newRsData = [];
          let count = 0;
          data.map((ele, index) => {
            count++;
            const addTicketNumber = {};
            if (
              data[index - 1]?.ticket_number !== ele.ticket_number &&
              count > 1
            ) {
              addTicketNumber["ticketData"] = { ...ele.ticket };
              addTicketNumber["ticketNumber"] = ele.ticket_number;
              newRsData.push(addTicketNumber);
            } else if (count === 1) {
              addTicketNumber["ticketData"] = { ...ele.ticket };
              addTicketNumber["ticketNumber"] = ele.ticket_number;
              newRsData.push(addTicketNumber);
            }
          });
          setTicketData(newRsData);
        });
    }
  }, [AuthenticatedUserId, isAuthenticated, cancelBookingStatus]);

  const onCancelBookingClick = (ticket_id) => {
    axios
      .post(`${backendUrl}/api/cancel_booking_view/${ticket_id}`)
      .then(function (response) {
        if (response.status === 200) {
          ToastMessage(SUCCESS, "Booking Cancelled Successfully");
          setCancelBookingStatus(true);
        }
      });
  };

  const onViewDtailsClickHandler = () => {
    setDisplayTicketDetialsModal(true);
  };

  const onHide = (name) => {
    setDisplayTicketDetialsModal(false);
  };

  const cancelBookingValidation = (data)=>{
    const departureTime = data.ticketData.trip_schedule_id.departure_time
    const departureTimeSplitArr = departureTime.split(':')
    const today = new Date()
    const currentTime = today.getHours()

    let bookingFlag = false

    // if(!data.ticketData.booked && data.ticketData.canceled){
    //   bookingFlag=true
    // }

    // if(bookingFlag){
    //     return true
    // }
    // else if(!bookingFlag &&  parseInt(currentTime) >= parseInt(departureTimeSplitArr[0])){
    //   return true
    // }
    // else{
      return false
    // }
  }

  return (
    <>
      {Array.isArray(ticketData) && ticketData.length > 0 ? (
        ticketData.map((data) => {
          return (
            <div className="flex justify-content-center">
              <Card className="shadow-5 mt-4" style={{ width: "90%" }}>
                <div className="grid">
                  <div className="col-2">
                    <img
                      src=""
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
                          <li className="text-xl font-medium">
                            {data.ticketData.trip_schedule_id.bus_id.bus_name}
                          </li>
                          <li>
                            <b>Ticket Number:</b> {data.ticketNumber}
                          </li>
                          <li>
                            <b>From :</b> {data.ticketData.boarding_point}
                          </li>
                          <li>
                            <b>To:</b> {data.ticketData.dropping_point}
                          </li>
                        </ul>
                      </div>

                      <div className="col-3">
                        <ul style={{ listStyleType: "none" }}>
                          <li>
                            <b>Date:</b>{" "}
                            {data.ticketData.trip_schedule_id.trip_date}
                          </li>
                          <li>
                            <b>Departure time:</b>{" "}
                            {data.ticketData.trip_schedule_id.departure_time} P.M
                          </li>
                          <li>
                            <b>Arrival time:</b> {data.ticketData.trip_schedule_id.arrival_time}{" "}
                            P.M
                          </li>
                          <li>
                            <b> Time:</b>{" "}
                            {data.ticketData.trip_schedule_id.journey_time} Hrs
                          </li>
                        </ul>
                      </div>

                      <div className="col-3">
                        <ul style={{ listStyleType: "none" }}>
                          <li>
                            <b>Bus No:</b>{" "}
                            {data.ticketData.trip_schedule_id.bus_id.bus_no}
                          </li>
                          <li>
                            <b>Bus Type:</b>{" "}
                            {data.ticketData.trip_schedule_id.bus_id.bus_type}
                          </li>
                          <li>
                            <b>Number of Seats:</b>{" "}
                            {data.ticketData.number_of_seats}
                          </li>
                          <li>
                            {" "}
                            <b>Seat Number:</b> {data.ticketData.seat_no}
                          </li>
                        </ul>
                      </div>
                      <div className="col-3">
                        <ul style={{ listStyleType: "none" }}>
                          <li>
                            <b>INR:</b>{" "}
                            <Badge
                              value={`${data.ticketData.total_amount}Rs`}
                            />
                          </li>
                          <br />
                          <li>
                            {data.ticketData.booked &&
                            !data.ticketData.canceled ? (
                              <>
                                <b>Status:</b>{" "}
                                <Badge value="Booked" severity="success" />
                              </>
                            ) : !data.ticketData.booked &&
                              data.ticketData.canceled ? (
                              <>
                                <b>Status:</b>{" "}
                                <Badge value="Cancelled" severity="danger" />
                              </>
                            ) : null}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-content-end">
                  <Button
                    type="submit"
                    className="mr-2"
                    label="View Details"
                    onClick={() => {
                      onViewDtailsClickHandler();
                      setTicketNumber(data.ticketNumber);
                    }}
                  />
                  <Button
                    type="Button"
                    label="Cancel Booking"
                    disabled={cancelBookingValidation(data)}
                    className="p-button-danger"
                    onClick={(e) => {
                      alert("Do you want to continue? Amout will be refunded in 6 business days")
                      onCancelBookingClick(data.ticketData.id)
                    }}
                  />
                </div>
              </Card>
            </div>
          );
        })
      ) : Array.isArray(ticketData) && ticketData.length === 0 ? (
        <div className="text-center mt-8">
          <span className="flex justify-content-center  text-8xl">
            No Ticket
          </span>
          <div id="info">
            <h3 className="flex justify-content-center ">
              No Ticket Available.
            </h3>
            <a href="/">Please Book your seat</a>
          </div>
        </div>
      ) : null}
      {displayTicketDetialsModal ? (
        <ManageTicketView
          ticketNo={ticketNumber !== "" ? ticketNumber : "ab"}
          showDialog={displayTicketDetialsModal}
          onHide={onHide}
        />
      ) : null}
    </>
  );
};
