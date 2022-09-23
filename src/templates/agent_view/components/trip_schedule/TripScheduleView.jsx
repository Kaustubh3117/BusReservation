import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../../environment/development";
import { GridView } from "../../../common/grid_view/GridView";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { ERROR, SUCCESS } from "../../../../constants/common/CrudMessageEnum";
import { config } from "../../../../environment/service";

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
      .get(`${backendUrl}/agent_api/tripschedule/${agentId}`)
      .then(function (response) {
        setData(response.data);
      });
  }, [refreshData]);


  const getDropDownValues=()=>{
    const dropDownArr = []
    data.map((dataEle) => {
      dropDownArr.push({name:dataEle.bus_id.bus_name, value:dataEle.bus_id.bus_name})
    })
    return dropDownArr
  }

  // tripScheduleFields(getDropDownValues())

  const onFormSubmitHandler = (values, id) => {
    values.agent = agentId;
    
    if (id !== null) {
      axios
        .put(
          `${backendUrl}/agent_api/bus_crud/${id}`,
          values,
          config
        )
        .then((response) => {
          ToastMessage(SUCCESS, "Trip Schedule added successfully.");
          setRefreshData(!refreshData);
        })
        .catch((error) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    } else {
      axios
        .post(`${backendUrl}/agent_api/bus_crud/`, values, config)
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
        formFields={tripScheduleFields(getDropDownValues())}
        onFormSubmitHandler={onFormSubmitHandler}
        onDeleteClickHandler={deleteClickHandler}
      />
    </>
  );
};
