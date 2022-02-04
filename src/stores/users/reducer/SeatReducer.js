import { SET_SEAT_DATA, REMOVE_SEAT_DATA } from "../../../constants/users/user_constants";

const initialState = {
   seatData:null,
  };

  export default function(state = initialState, action) {
    console.log("🚀 ~ file: SeatReducer.js ~ line 8 ~ function ~ action", action)
    const { type, payload } = action;
    console.log("🚀 ~ file: SeatReducer.js ~ line 10 ~ function ~ payload", payload)
    switch(type) {
        case SET_SEAT_DATA:
            return {
                ...state,
                seatData:payload
            }
        default:
                return state;
    }
  };