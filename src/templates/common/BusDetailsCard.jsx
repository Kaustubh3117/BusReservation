import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { FaLightbulb, FaBriefcaseMedical, FaPhoneVolume } from "react-icons/fa";
export const BusDetailsCard = () =>{
    return(
        <>
         <Container>
        {/* buslist section */}
        <div className="" style={{width:'100%'}}>
          <br />
          <div className="background_colors col-md-3">
            <Row>
              <Col>
                <span className="ml-3 mt-1 text-dark">Available buses</span>
              </Col>

              <Col>
                <label className="ml-2" id="noofbuses">
                  22
                </label>
              </Col>
            </Row>
          </div>
          <div className="invoice p-3 mb-3 shadow border" id="count">
            <Row>
              <Col sm={2} xs={2}>
                {" "}
                <img
                  src=""
                  className="mobile_image"
                  height="100px"
                  width="100px"
                />
              </Col>
              <Col sm={10} xs={10}>
                <div className="bus_list_content">
                  <div className="row">
                    <div className="col-12">
                      <h5>
                        <span>Ganesh Travels</span>
                        <small className="text-danger" style={{float:'right'}}>
                          <span>12/01/22</span>
                        </small>
                      </h5>
                    </div>
                  </div>
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      <b>From:</b>
                      <span>Karad</span>
                      <address>
                        <br />
                        <span>A/C Sleeper</span>
                      </address>
                    </div>

                    <div className="col-sm-4 invoice-col">
                      <b>To: </b> <span>Pune</span>
                      <address>
                        <b>Departure time:</b> <strong>1:00 p.m</strong>
                        <b>Arrival time:</b> 4:00 p.m
                        <strong>Time: </strong>
                        <span className="badge badge-info">3 hrs</span>
                        <br />
                      </address>
                    </div>

                    <div className="col-sm-4 invoice-col">
                      INR:{" "}
                      <b>
                        <span className="badge badge-primary">100</span>
                      </b>
                      <br />
                      <b>Bus No:</b> <span>Mh 54 ba 2342</span>
                      <br />
                      <strong>Available Seats: </strong>
                      <span>12</span>
                    </div>

                    <div className="col-12">
                      <ul className="nav">
                        <li className="float-right">
                          <span>
                            <b>Amenities |</b>
                          </span>
                        </li>
                        <li className="float-right ml-2">
                          <span className="text-warning">
                            <FaLightbulb />
                          </span>
                        </li>
                        <li className="float-right ml-2">
                          <span className="text-danger">
                            <FaBriefcaseMedical />
                          </span>
                        </li>
                        <li className="float-right ml-2">
                          <span className="text-primary">
                            <FaPhoneVolume />
                          </span>
                        </li>
                      </ul>
                    </div>

                  
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
        </>
    )
}