import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { backendUrl } from "../../../../environment/development";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { SUCCESS, WARNING } from "../../../../constants/common/CrudMessageEnum";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { ManageTicketView } from "../manage_tickets/ManageTicketView";
import { CancelBookingValidation, ManageBookingApiCall, OnFormSubmitHandler } from "./ManageBookingHelper";
import { Footer } from "../../assets/Footer";
import { setLoading } from "../../UserHelper";
import { LOADING } from "../../../../constants/common/CommonConstants";

export const ManageBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const AuthenticatedUserId = useSelector((state) =>
    state.auth.user !== null ? state.auth.user.id : null
  );
  const [ticketData, setTicketData] = useState({ ticketData: null });
  const [displayTicketDetialsModal, setDisplayTicketDetialsModal] =
    useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [cancelBookingStatus, setCancelBookingStatus] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (AuthenticatedUserId !== null) {
      setLoading(dispatch, LOADING, true)
      axios
        .get(`${backendUrl}/api/manage_booking/${AuthenticatedUserId}`)
        .then(function (response) {
          const data = response.data;
          const responseData = ManageBookingApiCall(data)
          setTicketData(responseData);
          setLoading(dispatch, LOADING, false)
        });
    }
  }, [AuthenticatedUserId, isAuthenticated, cancelBookingStatus]);

  const onCancelBookingClick = (ticket_id) => {
    setLoading(dispatch, LOADING, true)
    axios
      .post(`${backendUrl}/api/cancel_booking_view/${ticket_id}`)
      .then(function (response) {
        if (response.status === 200) {
          setLoading(dispatch, LOADING, false)
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

  const onSubmit = (data, e) => {
    const filterArr = OnFormSubmitHandler(data, ticketData)

    if(filterArr && filterArr.length > 0){
      setFilteredData(filterArr);
      e.target.reset();
    }
    else{
      ToastMessage(WARNING, "No data found for the search.")
    }
  };

  const renderHeader1 = () => {
    return (
      <Card className="shadow-4 mt-3">
      <div className="grid manageBookingFilter">
        <div className="sm:col-6 lg:col-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Keyword Search"
                {...register("globalSearch")}
              />
            </span>
            <Button
              type="submit"
              icon="pi pi-search"
              className="p-button ml-2 p-button-secondary"
              aria-label="search"
            />
            <Button
            type="button"
              icon="pi pi-times"
              onClick={() => {
                setFilteredData([]);
                setValue("globalSearch", "");
              }}
              className="p-button ml-2 p-button-secondary"
              aria-label="clearfilter"
            />
          </form>
        </div>
        <div className="lg:col-7"></div>
      </div>
    </Card>
    );
  };
  const cardData = Array.isArray(filteredData) && filteredData.length === 0 && Array.isArray(ticketData) && ticketData.length > 0?  ticketData : Array.isArray(filteredData) && filteredData.length > 0 ?  filteredData : []
  if(AuthenticatedUserId === null || AuthenticatedUserId === undefined){
    navigate('/login');
  }
  
  return (
    <>
    {AuthenticatedUserId?<>{renderHeader1()}
      {Array.isArray(cardData) && cardData.length > 0 ? (
        cardData.map((data) => {
          return (
            <div className="flex justify-content-center">
              <Card className="shadow-5 mt-4" style={{ width: "90%" }}>
                <div className="grid">
                  <div className="sm:col-6 lg:col-2">
                    <img
                      src={data.ticketData.trip_schedule_id.bus_id.image}
                      className="mobile_image"
                      // height="100px"
                      width="200px"
                      alt="img"
                    />
                  </div>
                  <div className="col-10">
                    <div className="grid">
                      <div className="sm:col-6 lg:col-3">
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

                      <div className="sm:col-6 lg:col-3">
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

                      <div className="sm:col-6 lg:col-3">
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
                      <div className="sm:col-6 lg:col-3">
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
                    disabled={CancelBookingValidation(data)}
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
          <p className="flex justify-content-center">
            <span className="sm:text-4xl md:text-4xl lg:text-8xl">
            No Ticket Available
            </span>
          </p>
          <div id="info">
            <a href="#">Please Book your seat</a>
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
      </>: <h2>You are logged out please login</h2> }

      <br/>
      <Footer/>
    </>
  );
};
