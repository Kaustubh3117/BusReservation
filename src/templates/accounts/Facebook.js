import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { facebookAuthenticate } from '../../stores/accounts/actions/AuthActions';
import queryString from 'query-string';

const Facebook = ({ facebookAuthenticate }) => {
    let location = useLocation();
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;
        if (state && code) {
            facebookAuthenticate(state, code);
        }
    }, [location]);

    return (
        <div classNameName='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Welcome to Auth System!</h1>
                <p className='lead'>This is an incredible authentication system with production level features!</p>
                <hr className='my-4' />
                <p>Click the Log In button</p>
                <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
            </div>
        </div>
    );
};

export default connect(null, { facebookAuthenticate })(Facebook);
