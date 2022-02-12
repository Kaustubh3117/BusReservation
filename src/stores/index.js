import { combineReducers } from 'redux';
import auth from './accounts/reducers/AuthReducer';
import user_data from './users/reducer/UserReducer'

export default combineReducers({
    auth,
    user_data
});
