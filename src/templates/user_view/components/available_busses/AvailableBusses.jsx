import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {BusDetailsCard} from "./components/BusDetailsCard"
import { useLocation } from "react-router-dom";
// import { MenuItems } from "./components/MenuItems";
import { BreadCrumbs } from "../../../common/BreadCrumbs";
// import { Divider } from "primereact/divider";
import { changeDateFormat } from "../../UserHelper";
import { cloneDeep } from "lodash";
import { backendUrl } from "../../../../environment/development";
import { Link } from "react-router-dom";
import { FilterTripScheduleApi } from "./AvailableBusHelper";

export const AvailableBusses = () => {
  const { state } = useLocation();
  const { start_location, end_location, date } = state;
  const [availableBusses, setAvailableBusses] = useState(null);
  const boardingPoint = useSelector((state) => state.user_data.boardingPoint);
  const droppingPoint = useSelector((state) => state.user_data.droppingPoint);

  useEffect(() => {
    const dateChanged = changeDateFormat(date);
    axios
      .get(
        `${backendUrl}/api/filter_trip_schedule/${start_location}/${end_location}/${dateChanged}`
      )
      .then(function (response) {
        const filterTripScheduleResData = FilterTripScheduleApi(response, boardingPoint, droppingPoint)
        setAvailableBusses(filterTripScheduleResData);
      });
  }, []);
  
  const breadCrumbItems = [
    {label: 'Available Busses', url: '/' }
];

  return (
    <>
      <BreadCrumbs items={breadCrumbItems} />
      <div className="my-5 mx-5">
        <div className="grid">
          {/* <div className="flex col-4">
            <div>
              <MenuItems />
            </div>
            <div>
              <Divider layout="vertical" />
            </div>
          </div> */}

          <div className="col">
            {availableBusses !== null && availableBusses.length > 0
              ? availableBusses.map((data) => {
                  return (
                    <>
                      <BusDetailsCard data={data} />
                      <Link
                        to={`/seat/${data.id}`}
                        className="p-button availableBusButton"
                      >
                        View Seat
                      </Link>
                    </>
                  );
                })
              :  <h1>No busses Available</h1>}
          </div>
        </div>
      </div>

      <div className="col-12"></div>
    </>
  );
};
