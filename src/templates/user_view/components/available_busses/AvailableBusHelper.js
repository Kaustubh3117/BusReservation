import { cloneDeep } from "lodash";

export const FilterTripScheduleApi = (response, boardingPoint, droppingPoint)=>{
    const data = cloneDeep(response.data);
    if (data !== null && data !== undefined && data.length > 0) {
      for (let ele = 0; ele < data.length; ele++) {
        if (
          (boardingPoint !== null && boardingPoint !== undefined) ||
          (droppingPoint !== null && droppingPoint !== undefined)
        ) {
          for (let bp = 0; bp < boardingPoint.length; bp++) {
            if (
              boardingPoint[bp] !== undefined &&
              boardingPoint[bp].trip_schedule_id !== null &&
              data[ele].id === boardingPoint[bp].trip_schedule_id
            ) {
              data[ele].fromLocation = boardingPoint[bp].pick_location;
              break;
            }
          }

          for (let dp = 0; dp < droppingPoint.length; dp++) {
            if (
              droppingPoint[dp] !== undefined &&
              data[ele].id === droppingPoint[dp].trip_schedule_id &&
              droppingPoint[dp].trip_schedule_id !== null
            ) {
              data[ele].toLocation = droppingPoint[dp].drop_location;
            }
          }
        }
      }
    }
    return data
}

export const OnFormSubmitHandler = (data, ticketData)=>{
    const filterArr = [];
    ticketData.map((busses) => {
      if (
        data.globalSearch === busses.price.toString()||
        data.globalSearch === busses.bus_id.bus_name ||
        data.globalSearch === busses.bus_id.bus_no ||
        data.globalSearch === busses.bus_id.bus_type ||
        data.globalSearch === busses.trip_date
      ) {
        filterArr.push(busses)
      }
    });
    return filterArr
}