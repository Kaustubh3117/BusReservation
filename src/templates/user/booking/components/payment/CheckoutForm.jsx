import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { savePassengerData } from "../../../../../stores/users/actions/UserAction";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const CheckoutForm = () => {
  const dispatch= useDispatch()
  const seatData = useSelector((state) => state.user_data.seatData);
  console.log("seatData: ...", seatData);
  const passengerData = useSelector((state) => state.user_data.passengerData);
  console.log("passengerData: ....", passengerData);
  const submitData=()=>{
   const data = {
     seat_data:seatData,
     passenger_data: passengerData
   }

   dispatch(savePassengerData(data))
   console.log("data: ", data);


  }
  
  return(
 <>
  <InputText className="w-full"  />
    <Button label="Pay" className="w-full mt-2 mb-4" /> 

    <Button label="Submit" className="w-full mt-2 mb-4" onClick={submitData()} /> 
    </>
  )
};
