import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { savePassengerData } from "../../../../../stores/users/actions/UserAction";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { setShowNextModdal } from "../../../../../stores/users/actions/UserAction";

export const CheckoutForm = () => {
  const dispatch= useDispatch()
  const seatData = useSelector((state) => state.user_data.seatData);
  const passengerData = useSelector((state) => state.user_data.passengerData);
  useEffect(()=>{
    seatData['seatData']['booking_status'] = true
    const data = {
      seat_data:seatData,
      passenger_data: passengerData
    }
    dispatch(savePassengerData(data))
    console.log("data: ", data);
  }, [])

  return(
 <>
  <InputText className="w-full"  />
  <Button label="Pay" className="w-full mt-2 mb-4"/> 
    <Button label="Back" className="w-full mt-2 mb-4"  onClick={()=>{dispatch(setShowNextModdal(false))}}/> 
    </>
  )
};
