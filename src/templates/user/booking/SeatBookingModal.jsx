import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Passenger } from "./components/Passenger";
import { PaymentModal } from "./components/payment/PaymentModal";
import { BoardingDroppingPoint } from "./components/BoardingDroppingPoint";

export const  SeatBookingModal = (props) => {
  const [nextModal, setNextModal] = useState(true);
  console.log("🚀 ~ file: SeatBookingModal.jsx ~ line 8 ~ SeatBookingModal ~ nextModal", nextModal)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            nextModal === true ? (<Passenger/>) :(<PaymentModal/>)
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" type="button" onClick={()=>setNextModal(false)}>
          Next →
        </Button>{" "}
        </Modal.Footer>
      </Modal>
    );
  }
  