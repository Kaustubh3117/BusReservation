export const CancelBookingValidation = (data) =>{
    const departureTime = data.ticketData.trip_schedule_id.departure_time
    const departureTimeSplitArr = departureTime.split(':')
    const today = new Date()
    const currentTime = today.getHours()

    let bookingFlag = false

    // if(!data.ticketData.booked && data.ticketData.canceled){
    //   bookingFlag=true
    // }

    // if(bookingFlag){
    //     return true
    // }
    // else if(!bookingFlag &&  parseInt(currentTime) >= parseInt(departureTimeSplitArr[0])){
    //   return true
    // }
    // else{
      return false
    // }
}

export const ManageBookingApiCall = (data)=>{
    let newRsData = [];
          let count = 0;
          data.map((ele, index) => {
            count++;
            const addTicketNumber = {};
            if (
              data[index - 1]?.ticket_number !== ele.ticket_number &&
              count > 1
            ) {
              addTicketNumber["ticketData"] = { ...ele.ticket };
              addTicketNumber["ticketNumber"] = ele.ticket_number;
              newRsData.push(addTicketNumber);
            } else if (count === 1) {
              addTicketNumber["ticketData"] = { ...ele.ticket };
              addTicketNumber["ticketNumber"] = ele.ticket_number;
              newRsData.push(addTicketNumber);
            }
          });
    return newRsData
}

export const OnFormSubmitHandler = (data, ticketData)=>{
    const filterArr = [];
    ticketData.map((ticketEle) => {
      if (
        data.globalSearch === ticketEle.ticketData.id ||
        data.globalSearch === ticketEle.ticketData.trip_schedule_id.bus_id.bus_name ||
        data.globalSearch === ticketEle.ticket_number ||
        data.globalSearch === ticketEle.ticketData.boarding_point ||
        data.globalSearch === ticketEle.ticketData.dropping_point
      ) {
        filterArr.push(ticketEle)
      }
    });
    return filterArr
}