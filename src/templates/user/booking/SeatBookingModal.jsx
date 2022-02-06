import React, { useState } from "react";
import { Passenger } from "./components/Passenger";
import { PaymentModal } from "./components/payment/PaymentModal";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export const SeatBookingModal = (props) => {
  const [nextModal, setNextModal] = useState(true);
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Next →"
          icon="pi pi-times"
          onClick={() => setNextModal(false)}
          className="p-button-text"
        />
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
        footer={renderFooter("displayResponsive")}
      >
        {nextModal === true ? <Passenger /> : <PaymentModal />}
      </Dialog>
    </>
  );
};
