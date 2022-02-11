import { SET_SEAT_DATA, REMOVE_SEAT_DATA } from "../../../constants/users/user_constants";

const initialState = {
   seatData:null,
  };

  // eslint-disable-next-line import/no-anonymous-default-export
  export default function(state = initialState, action) {
    const { type, payload } = action;
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