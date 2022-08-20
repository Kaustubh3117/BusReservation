import {
  SET_SEAT_DATA,
  REMOVE_SEAT_DATA,
  REQUEST_ADD_BOARDINGPOINT_DATA,
  REQUEST_ADD_DROPPINGPOINT_DATA,
  SET_PASSENGER_DATA,
  SAVE_PASSENGER_DATA,
  SET_RESERVE_SEAT_DATA,
  SET_SHOW_NEXT_MODAL
} from "../../../constants/users/user_constants";
import { config } from "../../../environment/service";
import axios from "axios";
import { backendUrl } from "../../../environment/development";
import { ToastMessage } from "../../../middleware/ToastMessage";
import { SUCCESS, ERROR } from "../../../constants/common/CrudMessageEnum";

export const setBoardingPointData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${backendUrl}/api/boarding_point/`);
    console.log("res: ", res);

    if (res.data !== null) {
      dispatch({
        type: REQUEST_ADD_BOARDINGPOINT_DATA,
        payload: res.data,
      });
    }
  } catch (err) {
    ToastMessage(ERROR, "Something Went Wrong While Fecthing Data");
  }
};

export const setDroppingPointData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${backendUrl}/api/dropping_point/`);
    if (res.data !== null) {
      dispatch({
        type: REQUEST_ADD_DROPPINGPOINT_DATA,
        payload: res.data,
      });
    }
  } catch (err) {
    ToastMessage(ERROR, "Something Went Wrong While Fecthing Data");
  }
};

export const setSeatData = (payload) => async (dispatch) => {
  dispatch({
    type: SET_SEAT_DATA,
    payload,
  });
};

export const setPassengerData = (payload) => async (dispatch) => {
    dispatch({
        type: SET_PASSENGER_DATA,
        payload,
      });
};

export const savePassengerData = (payload) => async () => {
  const body = JSON.stringify({ payload });
  try {
      const res = await axios.post(`${backendUrl}/api/passenger_data/`, body, config);
      if(res.status === 200){
        ToastMessage(SUCCESS, "Your booking is Successfull");
      }
  } catch (err) {  
      ToastMessage(ERROR, 'Your booking was unsuccessfull please contact admin if you are having problem with booking')
  }
};

export const setReservedSeatData = (busId) =>async (dispatch) => {
  try {
      const res = await axios.get(`${backendUrl}/api/get_seat/${busId}`);
      dispatch({
        type: SET_RESERVE_SEAT_DATA,
        payload: res.data,
      });

  } catch (err) {  
      console.log(err.data)
  }
};

export const setShowNextModdal = (flag) => (dispatch) =>{
  dispatch({
    type: SET_SHOW_NEXT_MODAL,
    payload: flag,
  });
}