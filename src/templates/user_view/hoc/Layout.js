import React, { useEffect, useState } from 'react';
import Navbar from '../assets/NavigationBar'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { useSelector } from "react-redux";

import { checkAuthenticated, load_user } from '../../../stores/accounts/actions/AuthActions';
import { setBoardingPointData, setDroppingPointData } from '../../../stores/users/actions/UserAction';

const Layout = ({ checkAuthenticated, load_user, setBoardingPointData, setDroppingPointData, children }) => {
    const loading = useSelector((state) => state.common.loading);



    useEffect(() => {
        checkAuthenticated();
        load_user();
        setBoardingPointData();
        setDroppingPointData();
    }, []);

    return (
        <div className={loading ? 'bg-contain bg-no-repeat bg-white-500 h-full w-full z-0' : ''}>
           {
            loading? <ReactLoading type='spin'color='#867EE5' height={40} width={40} className='z-1 top-50 left-50 fixed'/> :  <><Navbar /> {children}</>
           }
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user, setBoardingPointData, setDroppingPointData })(Layout);
