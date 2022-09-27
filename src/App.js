import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { Provider } from 'react-redux';
import store from './stores/store';
// prime react
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import "primeflex/primeflex.min.css"

// user import
import UserView from './templates/user_view/UserView';
import {AvailableBusses} from './templates/user_view/components/available_busses/AvailableBusses';
import { SeatView } from './templates/user_view/components/seat_selection/SeatView';
import Layout from './templates/user_view/hoc/Layout';
import { ManageBooking } from './templates/user_view/components/manage_booking/ManageBookingView';

//account import
import Login from './templates/accounts/Login';
import Signup from './templates/accounts/Signup';
import Activate from './templates/accounts/Activate';
import ResetPassword from './templates/accounts/ResetPassword';
import ResetPasswordConfirm from './templates/accounts/ResetPasswordConfirm';
import Facebook from './templates/accounts/Facebook';
import Google from './templates/accounts/Google';
import PageNotFound from './templates/404';

// agent import
import { AgentView } from './templates/agent_view/AgentView';
import { BusView } from './templates/agent_view/components/bus/BusView';
import { BusStatusView } from './templates/agent_view/components/bus_status/BusStatusView';
import { TripScheduleView } from './templates/agent_view/components/trip_schedule/TripScheduleView';
import { BoardingDroppingPointView } from './templates/agent_view/components/boarding_dropping_point/BoardingDroppingPointView';



const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    {/* user */}
                    <Route exact path='*' element={<PageNotFound/>} />
                    <Route exact path='/' element={<UserView/>} />
                    <Route exact path='/buslist' element={<AvailableBusses/>} />
                    <Route exact path='/seat/:id' element={<SeatView/>} />
                    <Route exact path='/manageBooking/:user_id' element={<ManageBooking/>} />
                    
                    {/* authentication */}
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/signup/:user' element={<Signup/>} />
                    <Route exact path='/facebook' element={<Facebook/>} />
                    <Route exact path='/google' element={<Google/>} />
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />

                    {/* agent */}
                    <Route exact path='/agentView' element={<AgentView/>} />
                    <Route exact path='/busView' element={<BusView/>} />
                    <Route exact path='/tripScheduleView' element={<TripScheduleView/>} />
                    <Route exact path='/boardingDroppingPoint' element={<BoardingDroppingPointView/>} />
                    <Route exact path='/busStatus' element={<BusStatusView/>} />
                </Routes>
            </Layout>
        </Router>
        
    </Provider>
);

export default App;