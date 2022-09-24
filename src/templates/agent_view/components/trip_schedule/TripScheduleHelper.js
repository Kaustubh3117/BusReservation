
export const GetDropDownValues = (busList) => {
    const dropDownArr = [];
    busList.map((dataEle) => {
      dropDownArr.push({ name: dataEle.bus_name, value: dataEle.id });
    });
    return dropDownArr;
  };

export const ConvertReponseData = (response) =>{
    const resDataArr = []
    response.data.map((data) => {
      let resObj = {};
      Object.entries(data).map(([key, value]) => {
        if (typeof value === "object") {
          Object.entries(value).map(([key, value]) => {
            if(key === 'id'){
              resObj['bus_id'] = value
            }else{
              resObj[key] = value;
            }
          })
        } else {
          if(key === 'trip_date'){
            const validate_date = new Date(value)
            if( validate_date instanceof Date && !isNaN(validate_date)){
              resObj[key] = value
            }else{
              const [day, month, year] = value.split('/');
              const result = [year, month, day].join('/');
              resObj[key] = result
            }
          }else{
            resObj[key] = value;
          }
        }
      });
      resDataArr.push(resObj)
    });
    return resDataArr
}

const convertDateTimeObjToString = (time) => {
    const timeStr = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeStr;
  };

export const ManageCreateEditTripSchedulePayload = (values, agentId) =>{
    values.agent = agentId;
    if (typeof values.trip_date === "object") {
      const convertDateToStringFormat =
        values.trip_date.toLocaleDateString("en-GB");
      values.trip_date = convertDateToStringFormat;
    }
    if (typeof values.arrival_time === "object") {
      const convertedArrivalTime = convertDateTimeObjToString(
        values.arrival_time
      );
      values.arrival_time = convertedArrivalTime;
    }
    if (typeof values.departure_time === "object") {
      const convertedDepartureTime = convertDateTimeObjToString(
        values.departure_time
      );
      values.departure_time = convertedDepartureTime;
    }
}

export const ManageDeletePayload = (data)=>{
    const deletePayload = [];
    if (Array.isArray(data) && data.length > 0) {
      for (const i in data) {
        deletePayload.push(data[i].id);
      }
    } else {
      deletePayload.push(data.id);
    }
    const finalPayload = { data: deletePayload };
    return finalPayload
}