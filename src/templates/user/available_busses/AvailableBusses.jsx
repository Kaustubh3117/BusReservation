import React, { useState, useEffect } from "react";
import axios from "axios";
import { BusDetailsCard } from "../../common/BusDetailsCard";
import { useLocation } from "react-router-dom";
import { MenuItems } from "../../common/MenuItems";
import { BreadCrumbs } from "../../common/BreadCrumbs";
import { Divider } from "primereact/divider";
import { changeDateFormat } from "../UserHelper";

export const AvailableBusses = () => {
  const { state } = useLocation();
  const { start_location, end_location, date } = state;
  const [availableBusses, setAvailableBusses] = useState(null);

  useEffect(() => {
    const dateChanged = changeDateFormat(date);
    axios
      .get(
        `http://127.0.0.1:8000/api/filter_trip_schedule/${start_location}/${end_location}/${dateChanged}`
      )
      .then(function (response) {
        console.log("trip schedule response: ", response.data);
        setAvailableBusses(response.data);
      })
      .catch(function (error) {
        console.log("tripschdule error...", error);
      });
  }, []);

  return (
    <>
      <BreadCrumbs />
      <div className="my-5 mx-5">
        <div className="grid">
          <div className="flex col-4">
            <div>
              <MenuItems />
            </div>
            <div>
              <Divider layout="vertical" />
            </div>
          </div>

          <div className="col-8">
            {availableBusses !== null ? availableBusses.map((data) => {
              return (
                <>
                  <BusDetailsCard props={data} />
                  <a
              href="/seatchart"
              id="submit"
              className="p-button"
              style={{ float: "right", marginTop: "-47px" }}
            >
              View Seats
            </a>
                </>
              );
            }):null}

          </div>
        </div>
      </div>

      <div className="col-12"></div>
    </>
  );
};
