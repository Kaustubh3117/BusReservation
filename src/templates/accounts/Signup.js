import React, { useState } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../stores/accounts/actions/AuthActions';
import axios from 'axios';
import { backendUrl } from '../../environment/development';
import { Col, Row, Container, Card } from "react-bootstrap";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from 'react-icons/bs'


const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${backendUrl}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${backendUrl}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Navigate  to='/' />
    }
    if (accountCreated) {
        return <Navigate  to='/login' />
    }

    return (
        <>
        <Container className="text-center mt-5">
            <Row>
                <Col></Col>
                <Col>
                <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                <Card.Text>
                  <span>Sign Up to create new Account</span>
                  <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group  mt-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group  mt-3'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group  mt-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group mt-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary rounded-0 shadow mt-3' type='submit' style={{width:'100%'}}>Register</button>
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

            <div className='mt-3'>
                Already have an account? <Link to='/login'>Sign In</Link>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
