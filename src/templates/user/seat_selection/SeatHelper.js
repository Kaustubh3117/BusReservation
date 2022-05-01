import React, {useState} from 'react';
export const getTripScheduleBpDpArray = (data, tripScheduleId)=>{
    let bpArray= []
    for (const ele in data){
        console.log("bpEle: ", data[ele]);
        if(tripScheduleId === data[ele].trip_schedule_id){
            console.log("inside if.....")
            bpArray.push(data[ele])
        }
    }
    console.log("bpArray: ", bpArray);
    return bpArray
}

export const changeKeysNamesFromObjectForRadio = (data) =>{
    if(data !== undefined && data !== null && data.length > 0){
        const resData = data.map((elm) => (
            {
            name:  elm.drop_location !== undefined ? elm.drop_location : elm.pick_location,
            value: elm.id,
          }
          ));
          return resData
    }
    return data
}