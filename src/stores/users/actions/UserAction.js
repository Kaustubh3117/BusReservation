import {
    SET_SEAT_DATA,
    REMOVE_SEAT_DATA,
    REQUEST_ADD_BOARDINGPOINT_DATA,
    REQUEST_ADD_DROPPINGPOINT_DATA
} from '../../../constants/users/user_constants';
import axios from "axios";
import { backendUrl } from '../../../environment/development';
import { ToastMessage } from '../../../middleware/ToastMessage';
import { SUCCESS, ERROR } from '../../../constants/common/CrudMessageEnum';

export const setSeatData = (payload) => async dispatch => {
dispatch( {
    type: SET_SEAT_DATA,
    payload
})
}

export const setBoardingPointData = () => async dispatch => {
    console.log("setBoardingPointData: ");
    try {
        const res = await axios.get(`${backendUrl}/api/boarding_point/`)
        console.log("res: ", res);

        // if (res.data !== null) {
            dispatch({
                type: REQUEST_ADD_BOARDINGPOINT_DATA,
                payload:res.data
            });
        // }
    } catch (err) {
        ToastMessage(ERROR, "Something Went Wrong While Fecthing Data")
    }
    }
