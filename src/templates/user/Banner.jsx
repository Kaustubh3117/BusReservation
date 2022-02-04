import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";

const Banner = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${date}`);
  };

  return (
    <>
    <Container>
      <Row>
          
      <Form  onSubmit={handleSubmit}>  
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>From Location</Form.Label>
          <Form.Control type="FromLocation" placeholder="From"
           onChange={(e) => setStartLocation(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>To Location</Form.Label>
          <Form.Control type="ToLocation" placeholder="To" 
          onChange={(e) => setEndLocation(e.target.value)}
          />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" 
          onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Link className="btn btn-primary" type="submit" to={`/buslist/${startLocation}/${endLocation}/${date}`}>Check Availability</Link>
      </Form>
      </Row>
      </Container>

      
      {/* <li><a href="/buslist">buslist</a></li> */}
    </>

  );
};

// const handleSubmit = (event) => {
//     alert('A name was submitted: ' + event);
//     event.preventDefault();
//   };

export default Banner;
