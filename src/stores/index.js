import { combineReducers } from 'redux';
import auth from './accounts/reducers/AuthReducer';
import user_data from './users/reducer/UserReducer';
import common from './common/reducers/CommonReducer'

export default combineReducers({
    auth,
    user_data,
    common
});
