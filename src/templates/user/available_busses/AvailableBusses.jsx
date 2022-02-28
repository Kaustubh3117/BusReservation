import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BusDetailsCard } from "../../common/BusDetailsCard";
import { useLocation } from "react-router-dom";
import { MenuItems } from "../../common/MenuItems";
import { BreadCrumbs } from "../../common/BreadCrumbs";
import { Divider } from "primereact/divider";
import { changeDateFormat } from "../UserHelper";
import { cloneDeep } from "lodash";
import { backendUrl } from "../../../environment/development";
import { Link } from "react-router-dom";

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
        const data = cloneDeep(response.data);
        if (data !== null && data !== undefined && data.length > 0) {
          for (let ele = 0; ele < data.length; ele++) {
            if (
              (boardingPoint !== null && boardingPoint !== undefined) ||
              (droppingPoint !== null && droppingPoint !== undefined)
            ) {
              for (let bp = 0; bp < boardingPoint.length; bp++) {
                if (
                  boardingPoint[bp] !== undefined &&
                  boardingPoint[bp].trip_schedule_id !== null &&
                  data[ele].id === boardingPoint[bp].trip_schedule_id
                ) {
                  data[ele].fromLocation = boardingPoint[bp].pick_location;
                  break;
                }
              }

              for (let dp = 0; dp < droppingPoint.length; dp++) {
                if (
                  droppingPoint[dp] !== undefined &&
                  data[ele].id === droppingPoint[dp].trip_schedule_id &&
                  droppingPoint[dp].trip_schedule_id !== null
                ) {
                  data[ele].toLocation = droppingPoint[dp].drop_location;
                }
              }
            }
          }
        }
        console.log("data: ", data);
        setAvailableBusses(data);
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
            {availableBusses !== null
              ? availableBusses.map((data) => {
                  return (
                    <>
                      <BusDetailsCard data={data} />
                      <Link
                        to={`/seat/${data.id}`}
                        className="p-button"
                        style={{ float: "right", marginTop: "-47px" }}
                      >
                        View Seat
                      </Link>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div className="col-12"></div>
    </>
  );
};
