import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { GridView } from "../../../common/grid_view/GridView";
import {
  boardingDataTableColums,
  boardingPointFields,
  droppingDataTableColums,
  droppingPointFields,
} from "./components/BoardingDroppingPointFields";
import { backendUrl } from "../../../../environment/development";
import { TabView, TabPanel } from "primereact/tabview";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { ERROR, SUCCESS } from "../../../../constants/common/CrudMessageEnum";
import {
  ManageDeletePayload,
  ConvertToDropDownFormat,
} from "./BoardingDroppingPointHelper";

export const BoardingDroppingPoint = () => {
  const agentId = useSelector((state) => state?.auth?.user?.id);
  const [boardingPoint, setBoardingPoint] = useState([]);
  const [droppingPoint, setDroppingPoint] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [tripScheduleList, setTripScheduleList] = useState(null);

  useEffect(() => {
    if (agentId) {
      axios
        .get(`${backendUrl}/agent_api/boading_point/${agentId}`)
        .then(function (response) {
          setBoardingPoint(response.data);
        });

      axios
        .get(`${backendUrl}/agent_api/dropping_point/${agentId}`)
        .then(function (response) {
          setDroppingPoint(response.data);
        });

      axios
        .get(`${backendUrl}/agent_api/tripschedule/${agentId}`)
        .then(function (response) {
          const resDataArr = ConvertToDropDownFormat(response);
          setTripScheduleList(resDataArr);
        });
    }
  }, [refreshData]);

  const onFormSubmitHandler = (values, id) => {
    let bpFlag = false;
    if (values.hasOwnProperty("drop_location")) {
      bpFlag = false;
    } else {
      bpFlag = true;
    }
    if (bpFlag) {
      if (id !== null) {
        axios
          .put(`${backendUrl}/agent_api/boading_point_crud/${id}`, values)
          .then((response) => {
            setRefreshData(!refreshData);
            ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
          })
          .catch((error) => {
            ToastMessage(ERROR, "Something went Wrong.");
          });
      } else {
        axios
          .post(`${backendUrl}/agent_api/boading_point_crud/`, values)
          .then((response) => {
            setRefreshData(!refreshData);
            ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
          })
          .catch((error) => {
            ToastMessage(ERROR, "Something went Wrong.");
          });
      }
    } else {
      if (id !== null) {
        axios
          .put(`${backendUrl}/agent_api/dropping_point_crud/${id}`, values)
          .then((response) => {
            setRefreshData(!refreshData);
            ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
          })
          .catch((error) => {
            ToastMessage(ERROR, "Something went Wrong.");
          });
      } else {
        axios
          .post(`${backendUrl}/agent_api/dropping_point_crud/`, values)
          .then((response) => {
            setRefreshData(!refreshData);
            ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
          })
          .catch((error) => {
            ToastMessage(ERROR, "Something went Wrong.");
          });
      }
    }
  };

  const deleteClickHandler = (data) => {
    const payload = ManageDeletePayload(data);
    let bpFlag = false;
    if (Array.isArray(data)) {
      if (data[0].hasOwnProperty("drop_location")) {
        bpFlag = false;
      } else {
        bpFlag = true;
      }
    } else {
      if (data.hasOwnProperty("drop_location")) {
        bpFlag = false;
      } else {
        bpFlag = true;
      }
    }

    if (!bpFlag) {
      axios
        .post(`${backendUrl}/agent_api/delete_dropping_points/`, payload)
        .then((response) => {
          setRefreshData(!refreshData);
          ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
        })
        .catch((err) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    } else {
      axios
        .post(`${backendUrl}/agent_api/delete_boarding_points/`, payload)
        .then((response) => {
          setRefreshData(!refreshData);
          ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
        })
        .catch((err) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    }
  };

  return (
    <>
      <TabView>
        <TabPanel header="Boarding Point">
          <GridView
            columns={boardingDataTableColums}
            data={boardingPoint}
            formFields={boardingPointFields(tripScheduleList)}
            onFormSubmitHandler={onFormSubmitHandler}
            onDeleteClickHandler={deleteClickHandler}
          />
        </TabPanel>
        <TabPanel header="Dropping Point">
          <GridView
            columns={droppingDataTableColums}
            data={droppingPoint}
            formFields={droppingPointFields(tripScheduleList)}
            onFormSubmitHandler={onFormSubmitHandler}
            onDeleteClickHandler={deleteClickHandler}
          />
        </TabPanel>
      </TabView>
    </>
  );
};
