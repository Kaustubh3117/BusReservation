import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
import { Badge } from "primereact/badge";
import ReactToPrint from "react-to-print";

import { backendUrl } from "../../../../environment/development";
import { PrintTicket } from "./components/PrintTicket";

export const ManageTicketView = (props) => {
  const [ticketData, setTicketData] = useState(null);
  const [passengerData, setPassengerData] = useState(null);
  const [printTicketModal, setPrintTicketModal] = useState(false);
  let componentRef = useRef();
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/get_ticket/${props.ticketNo}`)
      .then(function (response) {
        let newRsData = [];
        let pasengerRecords = [];
        let count = 0;
        const resSeatNumber = response.data[0].ticket.seat_no
        const seatArr = resSeatNumber.split(",");
        response.data.map((ele, index) => {
          pasengerRecords.push({
            name: ele.name,
            mobileNumber: ele.mobile_number,
            gender: ele.gender,
            age: ele.age,
            seatNumber:seatArr[index]
          });
          count++;
          const addTicketNumber = {};
          if (
            response.data[index - 1]?.ticket_number !== ele.ticket_number &&
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
        setPassengerData(pasengerRecords);
        // setTicketData(response.data);
      });
  }, [props.ticketNo]);

  // // Create Document Component
  const printTicket = () => (
    <>
      {ticketData !== null && ticketData.length > 0 ? (
        <div>
          {/* button to trigger printing of target component */}

          {/* component to be printed */}
          <PrintTicket
            ref={(el) => (componentRef = el)}
            ticketData={ticketData[0].ticketData}
            ticketNumber={ticketData[0].ticketNumber}
            passengerData={passengerData}
          />
          <div className="mt-4 flex justify-content-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setPrintTicketModal(false)}
              className="p-button-text"
            />
            {/* <Button
            label="Send"
            icon="pi pi-mail"
            onClick={() => props.onHide()}
            className="p-button-warning"
          /> */}
            <ReactToPrint
              trigger={() => (
                <Button
                  label="Print"
                  icon="pi pi-print"
                  className="p-button-secondary"
                  autoFocus
                />
              )}
              content={() => componentRef}
            />
          </div>
        </div>
      ) : null}
    </>
  );

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => props.onHide()}
          className="p-button-text"
        />
        <Button
          label="Print"
          icon="pi pi-print"
          onClick={() => setPrintTicketModal(true)}
          className="p-button-secondary"
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Dialog
        header="Ticket Details"
        visible={props.showDialog}
        style={{ width: "50vw" }}
        footer={
          ticketData !== null && ticketData.length > 0 ? renderFooter() : null
        }
        onHide={() => props.onHide()}
      >
        {ticketData !== null && ticketData.length > 0 ? (
          <>
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
                        {
                          ticketData[0].ticketData.trip_schedule_id.bus_id
                            .bus_name
                        }
                      </li>
                      <li>{ticketData[0].ticketNumber}</li>
                      <li>From : {ticketData[0].ticketData.boarding_point}</li>
                      <li>
                        {
                          ticketData[0].ticketData.trip_schedule_id.bus_id
                            .bus_type
                        }
                      </li>
                    </ul>

                    {/* {
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
                      } */}
                  </div>

                  <div className="col-3">
                    <ul style={{ listStyleType: "none" }}>
                      <li>To: {ticketData[0].ticketData.dropping_point}</li>
                      <li>
                        Departure time:{" "}
                        {ticketData[0].ticketData.departure_time} P.M
                      </li>
                      <li>
                        Arrival time: {ticketData[0].ticketData.arrival_time}{" "}
                        P.M
                      </li>
                      <li>
                        Time:{" "}
                        {ticketData[0].ticketData.trip_schedule_id.journey_time}{" "}
                        Hrs
                      </li>
                    </ul>
                  </div>

                  <div className="col-3">
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        Date:{" "}
                        {ticketData[0].ticketData.trip_schedule_id.trip_date}
                      </li>
                      <li>INR: {ticketData[0].ticketData.total_amount} Rs</li>
                      <li>
                        Bus No:{" "}
                        {
                          ticketData[0].ticketData.trip_schedule_id.bus_id
                            .bus_no
                        }
                      </li>
                      <li>
                        Number of Seats:{" "}
                        {ticketData[0].ticketData.number_of_seats}
                      </li>
                      <li>Seat Number: {ticketData[0].ticketData.seat_no}</li>
                      <li>
                        {ticketData[0].ticketData.booked &&
                        !ticketData[0].ticketData.canceled ? (
                          <Badge value="Booked" severity="success" />
                        ) : !ticketData[0].ticketData.booked &&
                          ticketData[0].ticketData.canceled ? (
                          <Badge value="Cancelled" severity="danger" />
                        ) : null}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <table style={{ width: "100%" }}>
              <tr>
                <th>UserName</th>
                <th>Mobile Number</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Seat Number</th>
              </tr>
              {passengerData && passengerData.length > 0
                ? passengerData.map((pEle) => {
                    return (
                      <tr>
                        <th>{pEle.name}</th>
                        <th>{pEle.mobileNumber}</th>
                        <th>{pEle.gender}</th>
                        <th>{pEle.age}</th>
                        <th>{pEle.seatNumber}</th>
                      </tr>
                    );
                  })
                : null}
            </table>
          </>
        ) : (
          <div className="text-center mt-8">
            <span className="flex justify-content-center  text-5xl">
              No Ticket Available
            </span>
            <div id="info">
              <a href="/">Please Book your seat</a>
            </div>
          </div>
        )}
        <br />
      </Dialog>

      {printTicketModal ? (
        <Dialog
          header="Print Ticket"
          visible={printTicketModal}
          style={{ width: "50vw" }}
          onHide={() => setPrintTicketModal(false)}
        >
          {printTicket()}
        </Dialog>
      ) : null}
    </>
  );
};
