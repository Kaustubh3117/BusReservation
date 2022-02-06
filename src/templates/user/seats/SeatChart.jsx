import React, { Component } from "react";
import { connect } from "react-redux";
import { setSeatData } from "../../../stores/users/actions/SeatAction";
import SeatPicker from "../../common/seat_chart/index";
import "../../common/seat_chart/seat_style/seat_chart.css";
import { SeatTypeData } from "../../common/seat_chart/SeatPicker/SeatTypeData";
// import { Button, Col, Card } from "react-bootstrap";
import { SeatBookingModal } from "../booking/SeatBookingModal";
import { GiSteeringWheel } from "react-icons/gi";
import { BoardingDroppingPoint } from "../booking/components/BoardingDroppingPoint";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { SeatColorDetails } from "./components/SeatColorDetails";
import { SeatDetailsConfirmation } from "./components/SeatDetailsConfirmation";
import { SeatSelectionAndPricing } from "./components/SeatSelectionAndPricing";

class SeatChart extends Component {
  state = {
    loading: false,
    price: 0,
    modalShow: false,
    selectedSeatCount: 0,
    seatNumber: [],
    showBpDpDetails: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.setSeatData({ ...this.props.seatData, seatData: this.state });
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
            console.log(
              `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
            );
            removeCb(params.row, params.number);
          }
          await new Promise((resolve) => setTimeout(resolve, 750));
          console.log(`Added seat ${number}, row ${row}, id ${id}`);
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
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
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

    const price = 100;
    this.setState({
      price: this.state.price + price,
      seatNumber: [...this.state.seatNumber, seatNumber],
    });
  };

  removeSeatData = (seatNumber, seatId) => {
    // remove seat from state
    var index = this.state.seatNumber.indexOf(seatNumber);
    if (index !== -1) {
      this.state.seatNumber.splice(index, 1);
    }

    const price = 100;
    let selectedSeat = this.setState({
      price: this.state.price - price,
      selectedSeatCount: this.state.selectedSeatCount - 1,
    });
  };

  render() {
    //static values for radio button afterwards set database values
    const boardingPointRadio = [
      { name: "Karad Bus Stand", value: "1" },
      { name: "Kolhapur Naka", value: "2" },
    ];

    const droppingPointRadio = [
      { name: "Swargate", value: "1" },
      { name: "Katraj", value: "2" },
    ];

    const bpDpVals = {
      boardingPointProps: boardingPointRadio,
      droppingPointProps: droppingPointRadio,
    };

    //send bus types
    const rows = SeatTypeData("sleeper");

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
                      <BoardingDroppingPoint bpDpVals={bpDpVals} />
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

        <SeatBookingModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
      </>
    );
  }
}

//get redux state here and pass it as props in class e.g this.props.isAuthenticated
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  seatData: state.seat_data.seatData,
});

// action in last second parenthesis
export default connect(mapStateToProps, { setSeatData })(SeatChart);
