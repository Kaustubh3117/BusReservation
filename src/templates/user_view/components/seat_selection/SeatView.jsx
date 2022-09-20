import React, { useState, useEffect } from "react";
import SeatChart from "./components/SeatChart";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../../../environment/development";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getTripScheduleBpDpArray } from "./SeatHelper";
import { changeKeysNamesFromObjectForRadio } from "./SeatHelper";

export const SeatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tripSheduleId = parseInt(id);
  const [tripSchedule, setTripSchedule] = useState(null);
  const boardingPoint = useSelector((state) => state.user_data.boardingPoint);

  const getBpArray = getTripScheduleBpDpArray(boardingPoint, tripSheduleId);
  const boardingPointRadio = changeKeysNamesFromObjectForRadio(getBpArray)

  const droppingPoint = useSelector((state) => state.user_data.droppingPoint);
  const getDpArray = getTripScheduleBpDpArray(droppingPoint, tripSheduleId);
  const droppingPointRadio = changeKeysNamesFromObjectForRadio(getDpArray)

  const bpDpVals = {
    boardingPointProps: boardingPointRadio,
    droppingPointProps: droppingPointRadio,
  };

  useEffect(() => {
    axios.get(`${backendUrl}/api/view_seat/${id}`).then(function (response) {
      setTripSchedule(response.data);
    });
  }, []);

  return (
    <>
      {tripSchedule !== null &&
      tripSchedule !== undefined &&
      bpDpVals !== null &&
      bpDpVals !== undefined ? (
        <SeatChart tripSchedule={tripSchedule[0]} bpDpArray={bpDpVals} navigate={navigate} />
      ) : null}
    </>
  );
};
