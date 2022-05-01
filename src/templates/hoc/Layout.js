import React, { useEffect } from 'react';
import Navbar from '../user_view/user_landing_view/components/NavigationBar'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '.././../stores/accounts/actions/AuthActions';
import { setBoardingPointData, setDroppingPointData } from '../../stores/users/actions/UserAction';

const Layout = ({ checkAuthenticated, load_user, setBoardingPointData, setDroppingPointData, children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
        setBoardingPointData();
        setDroppingPointData();
    }, []);

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user, setBoardingPointData, setDroppingPointData })(Layout);
