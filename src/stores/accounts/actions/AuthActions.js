import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT
} from '../../../constants/accounts/account_constants';
import { backendUrl } from '../../../environment/development';
import { ToastMessage } from '../../../middleware/ToastMessage';
import { SUCCESS, ERROR, WARNING } from '../../../constants/common/CrudMessageEnum';
import { config } from '../../../environment/service';

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${backendUrl}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${backendUrl}/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
            ToastMessage(ERROR, err.message)
        }
    }
};

export const facebookAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${backendUrl}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
            ToastMessage(ERROR, err.message)
        }
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${backendUrl}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${backendUrl}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
        ToastMessage(SUCCESS, 'You are logged in successfully')
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        console.log('login error..', err)
        if(err.response.data.detail !== undefined){
            ToastMessage(ERROR, "Please check email and password are entered correctly or Please register first.")
        }
        
    }
};

export const signup = (email, password, re_password, is_agent) => async dispatch => {
    const body = JSON.stringify({ email, password, re_password, is_agent });
    try {
        const res = await axios.post(`${backendUrl}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        ToastMessage(SUCCESS, "Verification url sent to your email, please check your email")

    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        if(err.response.data.detail === undefined &&  err.response.data.email !== undefined){
            ToastMessage(ERROR, err.response.data.email[0])
        }
        else{
            ToastMessage(ERROR, err.response.data.detail)
        }
    }
};

export const verify = (uid, token) => async dispatch => {
    const body = JSON.stringify({ uid, token });
console.log('activation..', body)
    try {
        await axios.post(`${backendUrl}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        ToastMessage(SUCCESS, "Registration successfull")

    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        ToastMessage(ERROR, err.response.data.detail)
    }
};

export const reset_password = (email) => async dispatch => {
    const body = JSON.stringify({ email });

    try {
        await axios.post(`${backendUrl}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
        ToastMessage(WARNING, "Please verify your email")
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
        ToastMessage(ERROR, err.response.data.detail)
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
        await axios.post(`${backendUrl}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
        ToastMessage(SUCCESS, "Password reset successfull")
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        ToastMessage(ERROR, err.response.data.detail)
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    ToastMessage(SUCCESS, "You are logged out successfully")
};
