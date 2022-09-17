import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button"
import axios from 'axios'
import { backendUrl } from "../../../../environment/development";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { SUCCESS, ERROR } from "../../../../constants/common/CrudMessageEnum";
import { Badge } from 'primereact/badge';


export const ManageTicketView = (props) => {
    const [ticketData, setTicketData] = useState(null)
    useEffect(() => {
        axios.get(`${backendUrl}/api/get_ticket/tku39afcsfme4hihe3va`).then(
            function (response) {
                setTicketData(response.data)
            }
        )
    }, [])

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => props.onHide()} className="p-button-text" />
                <Button label="Send" icon="pi pi-mail" onClick={() => props.onHide()} className="p-button-warning" />
                <Button label="Print" icon="pi pi-print" onClick={() => props.onHide()} className="p-button-secondary" autoFocus />
            </div>
        );
    }
    return (
        <>
            <Dialog header="Ticket Details" visible={props.showDialog} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => props.onHide()}>
            {
                !!ticketData ?  <div className="grid">
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
                        <li className="text-xl font-medium">{ticketData[0].trip_schedule_id.bus_id.bus_name}</li>
                        <li>From : {ticketData[0].boarding_point}</li>
                        <li>{ticketData[0].trip_schedule_id.bus_id.bus_type}</li>
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
                        <li>To: {ticketData[0].dropping_point}</li>
                        <li>Departure time: {ticketData[0].departure_time} P.M</li>
                        <li>Arrival time: {ticketData[0].arrival_time} P.M</li>
                        <li>Time: {ticketData[0].trip_schedule_id.journey_time} Hrs</li>
                      </ul>
                    </div>

                    <div className="col-3">

                      <ul style={{ listStyleType: "none" }}>
                        <li>Date: {ticketData[0].trip_schedule_id.trip_date}</li>
                        <li>INR: {ticketData[0].total_amount} Rs</li>
                        <li>Bus No: {ticketData[0].trip_schedule_id.bus_id.bus_no}</li>
                        <li>Number of Seats: {ticketData[0].number_of_seats}</li>
                        <li>Seat Number: {ticketData[0].seat_no}</li>
                        <li>{ticketData[0].booked && !ticketData[0].canceled ? <Badge value="Booked" severity="success" /> : !ticketData[0].booked && ticketData[0].canceled ? <Badge value="Cancelled" severity="danger" /> : null}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> :null
            }
           
               <br />
            </Dialog>
        </>
    )
}