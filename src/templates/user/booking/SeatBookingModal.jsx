import React, { useState } from "react";
import { Passenger } from "./components/Passenger";
import { PaymentModal } from "./components/payment/PaymentModal";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export const SeatBookingModal = (props) => {
  console.log("seat booking props: ", props);
  const [nextModal, setNextModal] = useState(true);
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Next →"
          onClick={() => setNextModal(false)}
          className="w-3"
          hidden={nextModal === false ? true : false}
        />
        {nextModal === false ? (
          <Button
            label="← Back"
            onClick={() => setNextModal(true)}
            className="w-3"
          />
        ) : null}
      </div>
    );
  };
  return (
    <>
      <Dialog
        header="Booking"
        visible={props.show}
        onHide={props.onHide}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        footer={renderFooter()}
      >
        {nextModal === true ? <Passenger /> : <PaymentModal />}
      </Dialog>
    </>
  );
};
