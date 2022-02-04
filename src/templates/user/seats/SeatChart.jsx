import React, { Component } from "react";
import { connect } from "react-redux";
import { setSeatData } from "../../../stores/users/actions/SeatAction";
import SeatPicker from "../../common/seat_chart/index";
import "../../common/seat_chart/seat_style/seat_chart.css";
import { SeatTypeData } from "../../common/seat_chart/SeatPicker/SeatTypeData";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { SeatBookingModal } from "../booking/SeatBookingModal";
import { GiSteeringWheel } from "react-icons/gi";
import { BoardingDroppingPoint } from "../booking/components/BoardingDroppingPoint";

class SeatChart extends Component {
  state = {
    loading: false,
    price: 0,
    modalShow: false,
    selectedSeatCount: 0,
    seatNumber: [],
    showBpDpDetails: false,
  };

  //   componentDidMount (){
  // this.setState({price:100})
  //   }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.setSeatData({ ...this.props.seatData, seatData: this.state });
    }
  }
  // addSeatCallback = ({ row, number, id }, addCb) => {
  //   this.setState(
  //     {
  //       loading: true,
  //     },
  //     async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 1500));
  //       console.log(`Added seat ${number}, row ${row}, id ${id}`);
  //       const newTooltip = `tooltip for id-${id} added by callback`;
  //       addCb(row, number, id, newTooltip);
  //       this.setState({ loading: false });
  //     }
  //   );
  // };

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
        <Container>
          <Row>
            <Col className="d-flex justify-content-end">
              <div style={{ marginTop: "100px" }}>
                <GiSteeringWheel size={40} className="steeringWheel" />
                <hr />
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
            </Col>

            <Col>
              <div className="seatPriceSection">
                <div style={{ marginRight: "30%" }}>
                  <Card>
                    <Card.Body>
                      {this.state.showBpDpDetails === true ? (
                        <>
                          <Row>
                            <Col>
                              {/* take this if code in Boarding dropping component if possible */}
                              Boarding & Dropping
                              <br />
                              From:{" "}
                              {
                                this.props.seatData.point.boardingPointRadio
                                  .name
                              }
                              <br />
                              <span className="dot">.</span>
                              <br />
                              <span className="dot">.</span>
                              <br />
                              <span className="dot">.</span>
                              <br />
                              To:{" "}
                              {
                                this.props.seatData.point.droppingPointRadio
                                  .name
                              }
                            </Col>
                            <Col>
                              <Button
                                variant="link"
                                className="fRight"
                                onClick={() =>
                                  this.setState({ showBpDpDetails: false })
                                }
                              >
                                Change
                              </Button>
                            </Col>
                          </Row>
                          <hr/>
                        </>
                      ) : this.state.selectedSeatCount > 0 ? (
                        <>
                          <BoardingDroppingPoint bpDpVals={bpDpVals} />
                          <hr />
                        </>
                      ) : null}
                      <div>
                        Price: <div className="fRight">100</div>
                      </div>
                      Selected Seat ({this.state.selectedSeatCount}):
                      {this.state.seatNumber.reverse().map((seatNo) => {
                        return (
                          <>
                            <div className="fRight">{seatNo},</div>
                          </>
                        );
                      })}
                      <div>
                        {" "}
                        Total Price:{" "}
                        <div className="fRight">{this.state.price}</div>
                      </div>
                      {this.state.showBpDpDetails ? (
                        <Button
                          variant="primary"
                          onClick={() => this.setState({ modalShow: true })}
                          style={{ width: "100%" }}
                          disabled={
                            this.state.selectedSeatCount > 0 ? false : true
                          }
                        >
                          Proceed to payment →
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() =>
                            this.setState({ showBpDpDetails: true })
                          }
                          style={{ width: "100%" }}
                          disabled={
                            this.props.seatData !== null &&
                            this.props.seatData.point !== undefined &&
                            this.props.seatData.point.boardingPointRadio
                              .value !== "" &&
                            this.props.seatData.point.droppingPointRadio
                              .value !== ""
                              ? false
                              : true
                          }
                        >
                          Continue →
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>

          <SeatBookingModal
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
        </Container>
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
