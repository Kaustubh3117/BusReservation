import { SET_SEAT_DATA, REMOVE_SEAT_DATA, REQUEST_ADD_DROPPINGPOINT_DATA, REQUEST_ADD_BOARDINGPOINT_DATA } from "../../../constants/users/user_constants";

const initialState = {
   seatData:null,
   boardingPoint:null,
   droppingPoint:null
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
        case REQUEST_ADD_BOARDINGPOINT_DATA:
            return{
                ...state,
                boardingPoint:payload
            }
        case REQUEST_ADD_DROPPINGPOINT_DATA:
            return{
                ...state,
                droppingPoint:payload
            }
        default:
                return state;
    }
  };