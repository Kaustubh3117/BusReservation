import { LOADING } from "../../../constants/common/CommonConstants";


export const setLoading = (flag) => (dispatch) =>{
    dispatch({
      type: LOADING,
      payload: flag,
    });
  }