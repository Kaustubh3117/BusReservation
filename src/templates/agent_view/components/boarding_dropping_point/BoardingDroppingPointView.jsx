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
import { ManageDeletePayload } from "./BoardingDroppingPointHelper";

export const BoardingDroppingPoint = () => {
  const agentId = useSelector((state) => state?.auth?.user?.id);
  const [activeIndex1, setActiveIndex1] = useState(1);
  const [boardingPoint, setBoardingPoint] = useState([]);
  const [droppingPoint, setDroppingPoint] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    if(agentId){
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
    }
  }, [refreshData]);

  const onFormSubmitHandler = (values, id) => {
    if (id !== null) {
      axios
        .put(`${backendUrl}/agent_api/boading_point_crud/${id}`, values)
        .then((response) => {
          setRefreshData(true);
          ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
        })
        .catch((error) => {
            ToastMessage(ERROR, "Something went Wrong.");
        });
    } else {
      axios
        .post(`${backendUrl}/agent_api/boading_point_crud/`, values)
        .then((response) => {
          setRefreshData(true);
          ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
        })
        .catch((error) => {
            ToastMessage(ERROR, "Something went Wrong.");
        });
    }
  };

  const deleteClickHandler = (data) => {
    const payload = ManageDeletePayload(data);
    let bpFlag = false
    if(Array.isArray(data)){
        if( data[0].hasOwnProperty('drop_location')){
            bpFlag = false
        }
        else{
            bpFlag = true
        }
    }
    else{
        if( data.hasOwnProperty('drop_location')){
            bpFlag = false
        }
        else{
            bpFlag = true
        }
    }
   
    if(!bpFlag){
        axios
        .post(`${backendUrl}/agent_api/delete_dropping_points/`, payload)
        .then((response) => {
          setRefreshData(!refreshData);
          ToastMessage(SUCCESS, "Trip Schedule deleted Successfully.");
        })
        .catch((err) => {
          ToastMessage(ERROR, "Something went Wrong.");
        });
    }else{
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
            formFields={boardingPointFields}
            onFormSubmitHandler={onFormSubmitHandler}
            onDeleteClickHandler={deleteClickHandler}
          />
        </TabPanel>
        <TabPanel header="Dropping Point">
          <GridView
            columns={droppingDataTableColums}
            data={droppingPoint}
            formFields={droppingPointFields}
            onFormSubmitHandler={onFormSubmitHandler}
            onDeleteClickHandler={deleteClickHandler}
          />
        </TabPanel>
      </TabView>
    </>
  );
};
