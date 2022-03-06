import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import cloneDeep from 'lodash'

export const SeatTypeData = (seatType, busData) =>{
console.log("busData: ", busData);
let resBusData = ''
  if(Array.isArray(busData) && busData.length >0){
    busData.forEach((ele)=>{
      resBusData = resBusData + "," + ele.seat_no
    })
    
  }
  const trimBusSeatString = resBusData.substring(1);
  console.log("bD: ", trimBusSeatString);
    let rows = []
    if(seatType === 'seater'){
        const seater =[
            [
              { id: 1, number: 1, isReserved: false },
              { id: 2, number: 2, isReserved: false },
              null,
              { id: 3, number: 3, isReserved: false },
              { id: 4, number: 4, isReserved: false }
            ],
            [
              { id: 5, number: 5, isReserved: false },
              { id: 6, number: 6, isReserved: false },
              null,
              { id: 7, number: 7, isReserved: false },
              { id: 8, number: 8, isReserved: false }
            ],
            [
              { id: 9, number: 9, isReserved: false },
              { id: 10, number: 10, isReserved: false },
              null,
              { id: 11, number: 11, isReserved: false },
              { id: 12, number: 12, isReserved: false }
            ],
            [
              { id: 13, number: 13, isReserved: false },
              { id: 14, number: 14, isReserved: false },
              null,
              { id: 15, number: 15, isReserved: false },
              { id: 16, number: 17, isReserved: false }
            ],
            [
              { id: 17, number: 18, isReserved: false },
              { id: 18, number: 19, isReserved: false },
              null,
              { id: 19, number: 20, isReserved: false },
              { id: 20, number: 21, isReserved: false }
            ],
            [
              { id: 21, number: 21, isReserved: false },
              { id: 22, number: 22, isReserved: false },
              null,
              { id: 23, number: 23, isReserved: false },
              { id: 24, number: 24, isReserved: false }
            ],
            [
              { id: 25, number: 25, isReserved: false },
              { id: 26, number: 26, isReserved: false },
              null,
              { id: 27, number: 27, isReserved: false },
              { id: 28, number: 28, isReserved: false }
            ],
            [
              { id: 29, number: 29, isReserved: false },
              { id: 30, number: 30, isReserved: false },
              null,
              { id: 31, number: 31, isReserved: false },
              { id: 32, number: 32, isReserved: false }
            ],
            [
              { id: 33, number: 33, isReserved: false },
              { id: 34, number: 34, isReserved: false },
              { id: 35, number: 35, isReserved: false },
              { id: 36, number: 36, isReserved: false },
              { id: 37, number: 37, isReserved: false }
            ],
          ];
         
          const getReservedSeat = reserveSeat(seater, trimBusSeatString) 
          rows = getReservedSeat
    }
    else if (seatType === 'sleeper'){
        const sleeper = [
            [
              { id: 1, number: 1, isReserved: false },
              { id: 2, number: 2, isReserved: false },
              null,
              { id: 3, number: 3, isReserved: false },
              // { id: 4, number: 4, isReserved: false }
            ],
            [
              { id: 5, number: 5, isReserved: false },
              { id: 6, number: 6, isReserved: false },
              null,
              { id: 7, number: 7, isReserved: false },
              // { id: 8, number: 8, isReserved: false }
            ],
            [
              { id: 9, number: 9, isReserved: false },
              { id: 10, number: 10, isReserved: false },
              null,
              { id: 11, number: 11, isReserved: false },
              // { id: 12, number: 12, isReserved: false }
            ],
            [
              { id: 13, number: 13, isReserved: false },
              { id: 14, number: 14, isReserved: false },
              null,
              { id: 15, number: 15, isReserved: false },
              // { id: 16, number: 17, isReserved: false }
            ],
            [
              { id: 17, number: 18, isReserved: false },
              { id: 18, number: 19, isReserved: false },
              null,
              { id: 19, number: 20, isReserved: false },
              // { id: 20, number: 21, isReserved: false }
            ],
            [
              { id: 21, number: 21, isReserved: false },
              { id: 22, number: 22, isReserved: false },
              null,
              { id: 23, number: 23, isReserved: false },
              // { id: 24, number: 24, isReserved: false }
            ],
            [
              { id: 25, number: 25, isReserved: false },
              { id: 26, number: 26, isReserved: false },
              null,
              { id: 27, number: 27, isReserved: false },
              // { id: 28, number: 28, isReserved: false }
            ],
            [
              { id: 29, number: 29, isReserved: false },
              { id: 30, number: 30, isReserved: false },
              null,
              { id: 31, number: 31, isReserved: false },
              // { id: 32, number: 32, isReserved: false }
            ],
            ]
            const getReservedSeat = reserveSeat(sleeper, trimBusSeatString) 
            rows = getReservedSeat
    }
   return rows
}

const reserveSeat = (seatArr, busData)=>{
  let resReservedSeat = null
  if(busData!==undefined && busData !== null){
     resReservedSeat = busData.split(',');
  }
  if(resReservedSeat !== null){
    seatArr.map((arr) => {
      arr.map((ele) => {
          if(ele !== null){
            resReservedSeat.map((seat)=>{
              const seatNo = parseInt(seat)
              if(seatNo === ele.number){
                ele.isReserved = true
              }
            })
          }
      })
    })
    return seatArr
  }
  else{
    return seatArr
  }
 
}