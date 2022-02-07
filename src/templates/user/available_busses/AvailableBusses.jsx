import React from "react";
import { BusDetailsCard } from "../../common/BusDetailsCard";
import { useLocation } from "react-router-dom";
import { MenuItems } from "../../common/MenuItems";
import { BreadCrumbs } from "../../common/BreadCrumbs";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";

export const AvailableBusses = () => {
  const { state } = useLocation();
  const { start_location, end_location, date } = state;
  console.log(start_location, end_location, date);

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
            <BusDetailsCard />
            <a
          href="/seatchart"
          id="submit"
          className="p-button"
          style={{ float: "right", marginTop:'-47px' }}
        >
          View Seats
        </a>
          </div>
        </div>
      </div>

      <div className="col-12">
        
      </div>
    </>
  );
};
