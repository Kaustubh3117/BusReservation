import { combineReducers } from 'redux';
import auth from './accounts/reducers/AuthReducer';
import seat_data from './users/reducer/SeatReducer'

export default combineReducers({
    auth,
    seat_data
});
