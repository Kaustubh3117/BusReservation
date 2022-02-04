import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BusDetailsCard } from "../../common/BusDetailsCard";

export const AvailableBusses = () => {
  const { startLocation, endLocation, date } = useParams();
  // useEffect(() => {

  //     document.title = `You clicked ${count} times`;
  //   });
  return (
    <>
     <BusDetailsCard/>
     <div className="col-12">
                    {/* /seat_booking/{{ buses.pk }} */}
                      <a
                        href="/seatchart"
                        id="submit"
                        className="btn btn-primary border"
                        style={{ float: "right" }}
                      >
                        View Seats
                      </a>
                    </div>
    </>
  );
};
