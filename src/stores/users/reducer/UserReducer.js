import { SET_SEAT_DATA, REMOVE_SEAT_DATA, SET_SHOW_NEXT_MODAL, SET_RESERVE_SEAT_DATA, REQUEST_ADD_DROPPINGPOINT_DATA, REQUEST_ADD_BOARDINGPOINT_DATA, SET_PASSENGER_DATA } from "../../../constants/users/user_constants";

const initialState = {
   seatData:null,
   boardingPoint:null,
   droppingPoint:null,
   passengerData:null,
   reservedSeatData:null,
   showNextModal:false,
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
        case REMOVE_SEAT_DATA:
            return {
                ...state,
                seatData:null
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
        case SET_PASSENGER_DATA:
            return{
                ...state,
                passengerData:payload
            }
        case SET_RESERVE_SEAT_DATA:
            return{
                ...state,
                reservedSeatData:payload
            }
        case SET_SHOW_NEXT_MODAL:
            return{
                ...state,
                showNextModal:payload
            }
        default:
                return state;
    }
  };