import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux'

export const Passenger = () => {
  const [formValues, setFormValues] = useState([
    { name: "", mobileNumber: "" },
  ]);
  const [radioValue, setRadioValue] = useState("1");

//get redux state
  const seatCount = useSelector((state) => state.seat_data.seatData.seatData.seatNumber)

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { Name: "", MobileNumber: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  const radios = [
    { name: "Male", value: "1" },
    { name: "Female", value: "2" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {seatCount.map((element, index) => (
        <div className="form-inline" key={index}>
          <Row>
            <h4 className="d-flex flex-row justify-content-between">
              Passenger {` 0${index + 1}`}
            </h4>

            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name..."
                  value={element.name || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="mobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Enter your mobile number.."
                  value={element.mobileNumber || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <Form.Group className="mb-3" controlId="idProof">
                <Form.Label>Upload ID Proof</Form.Label>
                <Form.Control
                  type="file"
                  name="idProof"
                  id="idProof"
                  value={element.idProof}
                  onChange={(e) => handleChange(index, e)}
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="radio">
                <Form.Label>Gender</Form.Label>
                <br/>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-success" : "outline-danger"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  id="age"
                  placeholder="Enter age.."
                  value={element.age || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
        </div>
      ))}
    

      {/* <Row style={{ marginLeft: "50px", marginRight: "50px" }}>
        <Button variant="dark" onClick={() => addFormFields()}>
          Add Passenger
        </Button>
      </Row> */}
    </form>
  );
};
