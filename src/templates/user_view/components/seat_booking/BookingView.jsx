import React from "react";
import { useSelector } from "react-redux";
import { Passenger } from "./components/Passenger";
import { Dialog } from "primereact/dialog";
import {CheckoutForm} from '../seat_booking/components/payment/CheckoutForm'
export const BookingView = (props) => {
  const showNextModal = useSelector(
    (state) => state.user_data.showNextModal
  );
  return (
    <>
      <Dialog
        header="Booking"
        visible={props.show}
        onHide={props.onHide}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
      >
        {showNextModal === false ? <Passenger /> : <CheckoutForm closePassengerModal={props.closePassengerModal}/>}
      </Dialog>
    </>
  );
};
