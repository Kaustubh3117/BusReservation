import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../stores/accounts/actions/AuthActions";
import axios from "axios";
import { Col, Row, Container, Card } from "react-bootstrap";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from 'react-icons/bs'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container className="text-center mt-5">
        <Row>
          <Col></Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Card.Text>
                  <span>Sign into your Account</span>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    
                    <div className="form-group mt-3">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                        required
                      />
                    </div>
                  
                    <button className="btn btn-primary mt-3 rounded-0 shadow" type="submit" style={{width:'100%'}}>
                    Login
                    </button>
                  
                    
                  </form>
                  <Row>
                    <Col>
                      <button
                        className="btn btn-light mt-3 shadow"
                        onClick={continueWithGoogle}
                        style={{width:'100%'}}
                      >
                          <FcGoogle size={20}/>
                        <span className="ml-3">Google</span>
                        
                      </button>
                    </Col>
                   
                    <Col>
                    <button
                      className="btn btn-light mt-3 shadow"
                      onClick={continueWithFacebook}
                      style={{width:'100%'}}
                    >
                        <BsFacebook size={20}/>
                      Facebook
                    </button>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </div>
                  <div className="mt-3">
                    Forgot your Password?
                    <Link to="/reset-password">Reset Password</Link>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
