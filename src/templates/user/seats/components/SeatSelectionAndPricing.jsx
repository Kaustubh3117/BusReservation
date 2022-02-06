export const SeatSelectionAndPricing = (props) =>{
    return(
        <>
         <div className="mx-3 my-3 text-lg font-medium">
                    <div>
                      Price: <div className="fRight">100</div>
                    </div>
                    <div>
                      Selected Seat ({props.selectedSeatCount}):
                      {props.seatNumber.reverse().map((seatNo) => {
                        return (
                          <>
                            <div className="fRight">{seatNo},</div>
                          </>
                        );
                      })}
                    </div>
                    <div>
                      Total Price:
                      <div className="fRight">{props.price}</div>
                    </div>
                  </div>
        </>
    )
}