import React, { Component } from "react";
import { connect } from "react-redux";
import { setReservedSeatData, setSeatData } from "../../../../stores/users/actions/UserAction";
import SeatPicker from "../../../common/seat_chart/index";
import "../../../common/seat_chart/seat_style/seat_chart.css";
import { SeatTypeData } from "../../../common/seat_chart/SeatPicker/SeatTypeData";
import { BookingView } from "../../seat_booking/BookingView";
import { GiSteeringWheel } from "react-icons/gi";
import { BoardingDroppingPoint } from "../../seat_booking/components/BoardingDroppingPoint";
import { Button } from "primereact/button";
import { SeatColorDetails } from "./SeatColorDetails";
import { SeatDetailsConfirmation } from "./SeatDetailsConfirmation";
import { SeatSelectionAndPricing } from "./SeatSelectionAndPricing";


class SeatChart extends Component {
  state = {
    busId:null,
    loggedInUserId:null,
    tripScheduleId:null,
    loading: false,
    price: 0,
    totalPrice:0,
    modalShow: false,
    selectedSeatCount: 0,
    seatNumber: [],
    showBpDpDetails: false,
    reservedSeatData: null,
    seatChart: null,
    renderKey: false,
  };

  componentDidMount(){
    const {tripSchedule, authData, isAuthenticated} =this.props

    

if(authData !== undefined && authData.user !== undefined &&  authData.user !== null && authData.user.id !== undefined  &&  authData.user.id !== null){
  this.setState({busId: tripSchedule.bus_id.id, loggedInUserId: authData.user.id, tripScheduleId:tripSchedule.id, price:tripSchedule.price})

}
  this.props.setReservedSeatData(tripSchedule.bus_id.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.setSeatData({ ...this.props.seatData, seatData: this.state });
    }
    if(prevProps.reserveSeatData !== this.props.reserveSeatData){
      const data = this.props.reserveSeatData
      this.setState({reservedSeatData: data})
    }

    if(prevState.reservedSeatData !== this.state.reservedSeatData){
this.setState({renderKey:true})
    }
  }

  addSeatCallbackContinousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    if (this.state.selectedSeatCount < 6) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          if (removeCb) {
            await new Promise((resolve) => setTimeout(resolve, 750));
            removeCb(params.row, params.number);
          }
          await new Promise((resolve) => setTimeout(resolve, 750));
          const newTooltip = `tooltip for id-${id} added by callback`;
          addCb(row, number, id, newTooltip);
          this.setState({ loading: false });
          this.setSeatData(number, id);
        }
      );
    } else {
      alert("Only Six seats allowed");
    }
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.removeSeatData(number, id);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  setSeatData = (seatNumber, seatId) => {
    let selectedSeat = this.setState({
      selectedSeatCount: this.state.selectedSeatCount + 1,
    });

    const price = this.state.price;
    this.setState({
      totalPrice: this.state.totalPrice + price,
      seatNumber: [...this.state.seatNumber, seatNumber],
    });
  };

  removeSeatData = (seatNumber, seatId) => {
    // remove seat from state
    var index = this.state.seatNumber.indexOf(seatNumber);
    if (index !== -1) {
      this.state.seatNumber.splice(index, 1);
    }

    const price = this.state.price;
    let selectedSeat = this.setState({
      totalPrice: this.state.totalPrice - price,
      selectedSeatCount: this.state.selectedSeatCount - 1,
    });
  };

  render() {
const { isAuthenticated} = this.props
    if(!isAuthenticated){
      window.location.href="/login"
    }
    //send bus types
    const rows = SeatTypeData(this.props.tripSchedule.bus_id.bus_type, this.state.reservedSeatData);
    const { loading } = this.state;

    return (
      <>
        <div className="grid flex justify-content-center">
          <div className="col-3">
            <div style={{ marginTop: "100px" }}>
              <div className="grid">
                <div className="col-4"><GiSteeringWheel size={40} className="steeringWheel" /></div>
                <div className="col-6"><SeatColorDetails/></div>
              </div>
             
              <div className="card" style={{ width: "20rem" }}>
                <SeatPicker
                  addSeatCallback={this.addSeatCallbackContinousCase}
                  removeSeatCallback={this.removeSeatCallback}
                  rows={rows}
                  maxReservableSeats={6}
                  alpha
                  visible
                  selectedByDefault
                  loading={loading}
                  tooltipProps={{ multiline: true }}
                  continuous
                  key={this.state.renderKey ?rows.length +1 : rows.length}
                />
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="seatPriceSection">
              <div>
             
                {/* pricing and booking */}
                <div className="card">
                  {this.state.showBpDpDetails === true ? (
                    <>
                      <div className="grid">
                        <div className="col my-3 mx-3">
                          <SeatDetailsConfirmation props={this.props}/>
                        </div>
                        <div className="col">
                          <Button
                            label="Change"
                            className="p-button-link fRight"
                            onClick={() =>
                              this.setState({ showBpDpDetails: false })
                            }
                          />
                        </div>
                      </div>
                      <hr />
                    </>
                  ) : this.state.selectedSeatCount > 0 ? (
                    <>
                      <BoardingDroppingPoint bpDpVals={this.props.bpDpArray} />
                      <hr />
                    </>
                  ) : null}
                 <SeatSelectionAndPricing {...this.state}/>
                  {this.state.showBpDpDetails ? (
                    <Button
                      label="Continue →"
                      onClick={() => this.setState({ modalShow: true })}
                      style={{ width: "100%" }}
                      disabled={this.state.selectedSeatCount > 0 ? false : true}
                    />
                  ) : (
                    <Button
                      label="Continue →"
                      onClick={() => this.setState({ showBpDpDetails: true })}
                      style={{ width: "100%" }}
                      disabled={
                        this.props.seatData !== null &&
                        this.props.seatData.point !== undefined &&
                        this.props.seatData.point.boardingPointRadio.value !==
                          "" &&
                        this.props.seatData.point.droppingPointRadio.value !==
                          ""
                          ? false
                          : true
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingView
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          data={this.props}
        />
      </>
    );
  }
}

//get redux state here and pass it as props in class e.g this.props.isAuthenticated
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authData: state.auth,
  seatData: state.user_data.seatData,
  reserveSeatData: state.user_data.reservedSeatData
});

// action in last second parenthesis
export default connect(mapStateToProps, { setSeatData, setReservedSeatData })(SeatChart);
