import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../../environment/development";
import { GridView } from "../../../common/grid_view/GridView";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { ERROR, SUCCESS } from "../../../../constants/common/CrudMessageEnum";
import { config } from "../../../../environment/service";
import {
  GetDropDownValues,
  ConvertReponseData,
  ManageCreateEditTripSchedulePayload,
  ManageDeletePayload,
} from "./TripScheduleHelper";

import {
  dataTableColums,
  tripScheduleFields,
} from "./components/TripScheduleFields";

export const TripScheduleView = () => {
  const agentId = useSelector((state) => state?.auth?.user?.id);
  const [refreshData, setRefreshData] = useState(false);
  const [data, setData] = useState([]);
  const [busList, setBusList] = useState([]);

  useEffect(() => {
    if (agentId) {
      axios
        .get(`${backendUrl}/agent_api/tripschedule/${agentId}`)
        .then(function (response) {
          const resDataArr = ConvertReponseData(response);
          setData(resDataArr);
        });
      axios
        .get(`${backendUrl}/agent_api/bus/${agentId}`)
        .then(function (response) {
          setBusList(response.data);
        });
    }
  }, [refreshData]);

  const onFormSubmitHandler = (values, id) => {
    ManageCreateEditTripSchedulePayload(values, agentId);
    if (id !== null) {
      axios
        .put(`${backendUrl}/agent_api/trip_schedule_crud/${id}`, values)
        .then((response) => {
          ToastMessage(SUCCESS, "Trip Schedule added successfully.");
          setRefreshData(!refreshData);
        })
        .catch((error) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    } else {
      axios
        .post(`${backendUrl}/agent_api/trip_schedule_crud/`, values)
        .then((response) => {
          ToastMessage(SUCCESS, "Trip Schedule added successfully.");
          setRefreshData(!refreshData);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            ToastMessage(
              ERROR,
              "TripSchedule is active for this bus. Please close status and try again."
            );
          } else {
            ToastMessage(ERROR, "Something went Wrong.");
          }
        });
    }
  };

  const deleteClickHandler = (data) => {
    const payload = ManageDeletePayload(data);
    axios
      .post(`${backendUrl}/agent_api/delete_trip_schedule/`, payload)
      .then((response) => {
        setRefreshData(!refreshData);
        ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
      })
      .catch((err) => {
        ToastMessage(ERROR, "Something went Wrong.");
      });
  };

  return (
    <>
      <GridView
        columns={dataTableColums}
        data={data}
        formFields={tripScheduleFields(GetDropDownValues(busList))}
        onFormSubmitHandler={onFormSubmitHandler}
        onDeleteClickHandler={deleteClickHandler}
      />
    </>
  );
};
