import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { GiSteeringWheel } from "react-icons/gi";
import { Button } from "primereact/button";
import { ToastMessage } from "../../../../../middleware/ToastMessage";
import { ERROR } from "../../../../../constants/common/CrudMessageEnum";
import { BreadCrumbs } from "../../../../common/BreadCrumbs";
import { Divider } from 'primereact/divider';

import {
  setReservedSeatData,
  setSeatData,
} from "../../../../../stores/users/actions/UserAction";
import SeatPicker from "../../../../common/seat_chart/index";
import "../../../../common/seat_chart/seat_style/seat_chart.css";
import { SeatTypeData } from "../../../../common/seat_chart/SeatPicker/SeatTypeData";
import { BookingView } from "../../seat_booking/BookingView";
import { BoardingDroppingPoint } from "../../seat_booking/components/BoardingDroppingPoint";
import { SeatColorDetails } from "./SeatColorDetails";
import { SeatDetailsConfirmation } from "./SeatDetailsConfirmation";
import { SeatSelectionAndPricing } from "./SeatSelectionAndPricing";
import { backendUrl } from "../../../../../environment/development";
import { setShowNextModdal } from "../../../../../stores/users/actions/UserAction";

class SeatChart extends Component {
  state = {
    busId: null,
    loggedInUserId: null,
    tripScheduleId: null,
    loading: false,
    price: 0,
    totalPrice: 0,
    modalShow: false,
    selectedSeatCount: 0,
    seatNumber: [],
    showBpDpDetails: false,
    reservedSeatData: null,
    seatChart: null,
    renderKey: false,
  };

  componentDidMount() {
    const { tripSchedule, authData } = this.props;

    if (
      authData !== undefined &&
      authData.user !== undefined &&
      authData.user !== null &&
      authData.user.id !== undefined &&
      authData.user.id !== null
    ) {
      this.setState({
        busId: tripSchedule.bus_id.id,
        loggedInUserId: authData.user.id,
        tripScheduleId: tripSchedule.id,
        price: tripSchedule.price,
      });
    }
    this.props.setReservedSeatData(tripSchedule.bus_id.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.setSeatData({ ...this.props.seatData, seatData: this.state });
    }
    if (prevProps.reserveSeatData !== this.props.reserveSeatData) {
      const data = this.props.reserveSeatData;
      this.setState({ reservedSeatData: data });
    }
    if (prevState.reservedSeatData !== this.state.reservedSeatData) {
      this.setState({ renderKey: true });
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

  checkIfSeatAlreadyBookedSimultaneously = () => {
    const seatNumber = this.state.seatNumber;
    const tripScheduleId = this.state.tripScheduleId;
    const data = {
      seatNumber: seatNumber,
      tripScheduleId: tripScheduleId,
    };
    axios
      .post(`${backendUrl}/api/seat_status/`, data)
      .then((response) => {
        if (response.data.status === "false") {
          this.setState({ showBpDpDetails: true });
        } else {
          ToastMessage(
            ERROR,
            "oops seat already booked by someone just now please refresh and try another seat"
          );
        }
      });
  };

  closePassengerModal =()=>{
    this.setState({ modalShow: false})
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
    //send bus types
    const rows = SeatTypeData(
      this.props.tripSchedule.bus_id.bus_type,
      this.state.reservedSeatData
    );
    const { loading } = this.state;
    const breadCrumbItems = [
      {label: 'Available Busses', url: '/' },
      {label: 'Seat Selection',url: '/' }
  ];
    return (
      <>
       <BreadCrumbs items={breadCrumbItems}/>
       <div className="grid flex justify-content-center">
          <div className="col-3 shadow-3" style={{ marginTop: "100px", border:'1px solid black' }}>
            <div style={{ marginTop: "30px" }}>
              <div className="grid">
                <div className="col-4">
                  <GiSteeringWheel size={40} className="steeringWheel" />
                </div>
                <div className="col-6">
                  <SeatColorDetails />
                </div>
              </div>

              <div className="card" style={{ width: "20rem" }}>
                {rows.length === 2 ? (
                  <>
                    {rows.map((row, index) => {
                      return (
                        <>
                          <div className={index === 1 ? "mt-8" : ""}>
                            {index === 0 ? (
                              <label className="text-center">
                                <b>Lower Deck</b>
                              </label>
                            ) : (
                              <label className="text-center">
                                <b>Upper Deck</b>
                              </label>
                            )}
                            <SeatPicker
                              addSeatCallback={
                                this.addSeatCallbackContinousCase
                              }
                              removeSeatCallback={this.removeSeatCallback}
                              rows={row}
                              maxReservableSeats={6}
                              alpha
                              visible
                              selectedByDefault
                              loading={loading}
                              tooltipProps={{ multiline: true }}
                              continuous
                              key={
                                this.state.renderKey
                                  ? rows.length + 1
                                  : rows.length
                              }
                            />
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
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
                      key={this.state.renderKey ? rows.length + 1 : rows.length}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="seatPriceSection shadow-3">
              <>
                {/* pricing and booking */}
                <div className="card mt-4 mb-4">
                  {this.state.showBpDpDetails === true ? (
                    <>
                      <div className="grid">
                        <div className="col my-3 mx-3">
                          <SeatDetailsConfirmation props={this.props} />
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
                      <Divider type="dashed" />
                    </>
                  ) : this.state.selectedSeatCount > 0 ? (
                    <>
                      <BoardingDroppingPoint bpDpVals={this.props.bpDpArray} />
                      <Divider type="dashed" />
                    </>
                  ) : null}
                  <SeatSelectionAndPricing {...this.state} />
                  {this.state.showBpDpDetails ? (
                    <Button
                      label="Continue →"
                      onClick={() => {this.setState({ modalShow: true });  this.props.setShowNextModdal(false)}}
                      style={{ width: "100%" }}
                      disabled={this.state.selectedSeatCount > 0 ? false : true}
                    />
                  ) : (
                    <Button
                      label="Continue →"
                      onClick={() => {
                        this.checkIfSeatAlreadyBookedSimultaneously();
                      }}
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
              </>
            </div>
          </div>
        </div>

        <BookingView
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          data={this.props}
          closePassengerModal ={this.closePassengerModal}
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
  reserveSeatData: state.user_data.reservedSeatData,
  showPaymentModal:state.user_data.showNextModal
});

// action in last second parenthesis
export default connect(mapStateToProps, { setSeatData, setReservedSeatData, setShowNextModdal })(
  SeatChart
);
