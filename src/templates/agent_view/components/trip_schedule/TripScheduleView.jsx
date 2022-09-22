import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../../environment/development";
import { GridView } from "../../../common/grid_view/GridView";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { ERROR, SUCCESS } from "../../../../constants/common/CrudMessageEnum";
import { config, multiPartConfig } from "../../../../environment/service";

import {
  dataTableColums,
  tripScheduleFields,
} from "./components/TripScheduleFields";

export const TripScheduleView = () => {
const agentId = useSelector((state) => state?.auth?.user?.id);
  const [refreshData, setRefreshData] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/agent_api/tripschedule/`)
      .then(function (response) {
        setData(response.data);
      });
  }, [refreshData]);

  const onFormSubmitHandler = (values, id) => {
    values.agent = agentId;
    let form_data = new FormData();
    if (typeof values.image === "object")
      form_data.append("image", values.image, values.image.name);
    form_data.append("id", values.id);
    form_data.append("bus_name", values.bus_name);
    form_data.append("bus_no", values.bus_no);
    form_data.append("bus_type", values.bus_type);
    form_data.append("capacity", values.capacity);
    form_data.append("agent", values.agent);
    if (id !== null) {
      axios
        .put(
          `${backendUrl}/agent_api/bus_crud/${id}`,
          form_data,
          multiPartConfig
        )
        .then((response) => {
          ToastMessage(SUCCESS, "Bus added successfully.");
          setRefreshData(!refreshData);
        })
        .catch((error) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    } else {
      axios
        .post(`${backendUrl}/agent_api/bus_crud/`, form_data, multiPartConfig)
        .then((response) => {
          setRefreshData(!refreshData);
        })
        .catch((error) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    }
  };

  const deleteClickHandler = (data) => {
    const deletePayload = [];
    if (Array.isArray(data) && data.length > 0) {
      for (const i in data) {
        deletePayload.push(data[i].id);
      }
    } else {
      deletePayload.push(data.id);
    }

    const finalPayload = { data: deletePayload };
    axios
      .post(`${backendUrl}/agent_api/delete_bus/`, finalPayload, config)
      .then((response) => {
        setRefreshData(!refreshData);
        ToastMessage(SUCCESS, "Buss deleted Successfully.");
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
        formFields={tripScheduleFields}
        onFormSubmitHandler={onFormSubmitHandler}
        onDeleteClickHandler={deleteClickHandler}
      />
    </>
  );
};
