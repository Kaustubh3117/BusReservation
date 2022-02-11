import {
    SET_SEAT_DATA,
    REMOVE_SEAT_DATA
} from '../../../constants/users/user_constants';

export const setSeatData = (payload) => async dispatch => {
dispatch( {
    type: SET_SEAT_DATA,
    payload
})
}

