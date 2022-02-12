import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BusDetailsCard } from "../../common/BusDetailsCard";
import { useLocation } from "react-router-dom";
import { MenuItems } from "../../common/MenuItems";
import { BreadCrumbs } from "../../common/BreadCrumbs";
import { Divider } from "primereact/divider";
import { changeDateFormat } from "../UserHelper";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

export const AvailableBusses = () => {
  // const navigate = useNavigate();
  const { state } = useLocation();
  const { start_location, end_location, date } = state;
  const [availableBusses, setAvailableBusses] = useState(null);
  const boardingPoint = useSelector((state) => state.user_data.boardingPoint);
  console.log("boardingPoint: ", boardingPoint);

  const droppingPoint = useSelector((state) => state.user_data.droppingPoint);
  console.log("droppingPoint: ", droppingPoint);

  useEffect(() => {
    const dateChanged = changeDateFormat(date);
    axios
      .get(
        `http://127.0.0.1:8000/api/filter_trip_schedule/${start_location}/${end_location}/${dateChanged}`
      )
      .then(function (response) {
        console.log("trip schedule response: ", response.data);
        const data = cloneDeep(response.data);
        if (data !== null && data !== undefined && data.length > 0) {
          for (let ele = 0; ele < data.length; ele++) {
            console.log(" data[ele]: ", data[ele]);
            if (
              (boardingPoint !== null && boardingPoint !== undefined) ||
              (droppingPoint !== null && droppingPoint !== undefined)
            ) {
              for (let bp = 0; bp < boardingPoint.length; bp++) {
                console.log("boardingPoint[bp]: ", boardingPoint[bp]);
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
                console.log("doppingPoint[dp]: ", droppingPoint[dp]);
                if (
                  droppingPoint[dp] !== undefined &&
                  data[ele].id === droppingPoint[dp].trip_schedule_id &&
                  droppingPoint[dp].trip_schedule_id !== null
                ) {
                  data[ele].toLocation= droppingPoint[dp].drop_location;
                }
              }
            }
          }
        }

        console.log("data: ", data);
        setAvailableBusses(data);
      })
      .catch(function (error) {
        console.log("tripschdule error...", error);
      });
  }, []);

  // const onClick= () =>{
  //   navigate("/buslist", {
  //     state: {
  //       trip_schedule_id: '',
  //       price: '',
  //       bus_type: '',
  //     },
  //   });
  // }

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
                })
              : null}
          </div>
        </div>
      </div>

      <div className="col-12"></div>
    </>
  );
};
