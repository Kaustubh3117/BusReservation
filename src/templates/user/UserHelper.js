export const changeKeysFromObject = (data) =>{
    console.log("data: ", data);
    if( data !== undefined && data.length > 0){
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
  
  const finalDate = year+'-'+monthWithZero+'-'+dayWithZero;
  console.log("finalDate: ", finalDate);
  return finalDate
}