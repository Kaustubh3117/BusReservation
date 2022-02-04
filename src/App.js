import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"

import Home from './templates/user/Home';
import {AvailableBusses} from './templates/user/available_busses/AvailableBusses';
import SeatChart from './templates/user/seats/SeatChart';

import Login from './templates/accounts/Login';
import Signup from './templates/accounts/Signup';
import Activate from './templates/accounts/Activate';
import ResetPassword from './templates/accounts/ResetPassword';
import ResetPasswordConfirm from './templates/accounts/ResetPasswordConfirm';
import Facebook from './templates/accounts/Facebook';
import Google from './templates/accounts/Google';
import PageNotFound from './templates/404';


import { Provider } from 'react-redux';
import store from './stores/store';

import Layout from './templates/hoc/Layout';
import { ManageBooking } from './templates/user/manage_booking/ManageBooking';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='*' element={<PageNotFound/>} />
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/buslist/:startLocation/:endLocation/:date' element={<AvailableBusses/>} />
                    <Route exact path='/seatchart' element={<SeatChart/>} />
                    <Route exact path='/manageBooking' element={<ManageBooking/>} />
                    
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/signup' element={<Signup/>} />
                    <Route exact path='/facebook' element={<Facebook/>} />
                    <Route exact path='/google' element={<Google/>} />
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;