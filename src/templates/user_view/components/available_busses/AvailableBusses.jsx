import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {BusDetailsCard} from "./components/BusDetailsCard"
import { useLocation } from "react-router-dom";
// import { MenuItems } from "./components/MenuItems";
import { BreadCrumbs } from "../../../common/BreadCrumbs";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
// import { Divider } from "primereact/divider";
import { changeDateFormat } from "../../UserHelper";
import { backendUrl } from "../../../../environment/development";
import { Link } from "react-router-dom";
import { FilterTripScheduleApi, OnFormSubmitHandler } from "./AvailableBusHelper";
import { SeatView } from "../seat_selection/SeatView";
import { ToastMessage } from "../../../../middleware/ToastMessage";
import { WARNING } from "../../../../constants/common/CrudMessageEnum";
import { Footer } from "../../assets/Footer";
import { removeSeatData } from "../../../../stores/users/actions/UserAction";

export const AvailableBusses = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayBasic, setDisplayBasic] = useState(false);
  const { start_location, end_location, date } = state;
  const [availableBusses, setAvailableBusses] = useState(null);
  const boardingPoint = useSelector((state) => state.user_data.boardingPoint);
  const droppingPoint = useSelector((state) => state.user_data.droppingPoint);
  const [filteredData, setFilteredData] = useState([]);
  const [viewSeatId, setViewSeatId] = useState(null)
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

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

const onSubmit = (data, e) => {
  const filterArr = OnFormSubmitHandler(data, availableBusses)
  if(filterArr && filterArr.length > 0){
    setFilteredData(filterArr);
    e.target.reset();
  }
  else{
    ToastMessage(WARNING, "No data found for the search.")
  }
 
};

const renderHeader1 = () => {
  return (
    <div className="flex justify-content-between manageBookingFilter">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
         placeholder="Keyword Search"
         {...register("globalSearch")}
        />
      </span>
        <Button
        label="Search"
       type='submit'
       className="ml-2"
     
      />
      <Button
      type='button'
        label="Clear Filter"
        icon="pi pi-times"
        onClick={() =>{setFilteredData([]); setValue('globalSearch', '')}}
        className="p-button-warning ml-4"
        autoFocus
      />
      </form>
      <Button
      type="button"
        label="Change Date"
        icon="pi pi-times"
        onClick={() =>navigate('/')}
        className="p-button-warning ml-4"
        autoFocus
      />
    </div>
  );
};

const onHide = () => {
  dispatch(removeSeatData());
setDisplayBasic(false)
}

const cardData = Array.isArray(filteredData) && filteredData.length === 0 && Array.isArray(availableBusses) && availableBusses.length > 0?  availableBusses : Array.isArray(filteredData) && filteredData.length > 0 ?  filteredData : []

  return (
    <>
      <BreadCrumbs items={breadCrumbItems} />
      {renderHeader1()}
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
            {cardData !== null && cardData.length > 0
              ? cardData.map((data) => {
                  return (
                    <>
                      <BusDetailsCard data={data} />
                      <Button label="View Seat" onClick={() => {setDisplayBasic(true); setViewSeatId(data.id)}} className="p-button availableBusButton" />
                    </>
                  );
                })
              :  <h1>No busses Available</h1>}
          </div>
        </div>
      </div>

      <div className="col-12"></div>
      <Dialog header="Seat View" visible={displayBasic} style={{ width: '70vw' }} onHide={() => onHide()}>
    <SeatView id={viewSeatId}/>
</Dialog>
<br/>
      <Footer/>
    </>
  );
};
