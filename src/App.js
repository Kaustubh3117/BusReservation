import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
// prime react
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import "primeflex/primeflex.min.css"

import HomeView from './templates/user_view/user_landing_view/HomeView';
import {AvailableBusses} from './templates/user_view/available_busses/AvailableBusses';
import { SeatView } from './templates/user_view/seat_selection/SeatView';

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
import { ManageBooking } from './templates/user_view/manage_booking/ManageBookingView';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='*' element={<PageNotFound/>} />
                    <Route exact path='/' element={<HomeView/>} />
                    <Route exact path='/buslist' element={<AvailableBusses/>} />
                    <Route exact path='/seat/:id' element={<SeatView/>} />
                    <Route exact path='/manageBooking/:user_id' element={<ManageBooking/>} />
                    
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