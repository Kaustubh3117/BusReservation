import uniqBy from 'lodash/uniqBy';
 
export const changeKeysFromObject = (data) =>{
    if(data !== undefined && data !== null && data.length > 0){
        const resData = data.map((elm) => (
            {
            name:  elm.drop_location !== undefined ? elm.drop_location : elm.pick_location,
            code: elm.id,
          }
          ));
          return resData
    }
    return data
}

export const changeDateFormat = (date) =>{
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
  
    const monthWithZero = (month < 10 ? '0' : '') + month;
    const dayWithZero = (day < 10 ? '0' : '') + day;
  
  const finalDate = dayWithZero+'-'+monthWithZero+'-'+year;
  return finalDate
}

export const removeDuplicateArrayObject = (arr, type)=>{
  let data;
  if(arr !== undefined && arr !== null && arr.length > 0){
    if(type === 'boarding_point'){
       data = uniqBy(arr, 'pick_location');
    }
    if(type === 'dropping_point'){
       data = uniqBy(arr, 'drop_location');
    }
  return data
  }
}

export const setLoading = (dispatch, type, flag)=>{
  dispatch({
    type: type,
    payload: flag
  })
}
