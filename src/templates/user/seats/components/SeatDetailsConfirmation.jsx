import { useSelector } from "react-redux";
export const SeatDetailsConfirmation = () =>{
    const point = useSelector(state => state.seat_data.seatData.point);
    return (
        <>
          <span className="text-xl font-medium">
                            Boarding & Dropping
                          </span>
                          <br />
                          <div className="mt-3">
                            <span className="font-medium">From: </span>
                            {point.boardingPointRadio.name}
                            <br />
                            <div className="ml-2">
                              <span className="dot">.</span>
                              <br />
                              <span className="dot">.</span>
                              <br />
                              <span className="dot">.</span>
                              <br />
                            </div>
                            <span className="font-medium">To: </span>
                            {point.droppingPointRadio.name}
                          </div>
        </>
      
    )
}