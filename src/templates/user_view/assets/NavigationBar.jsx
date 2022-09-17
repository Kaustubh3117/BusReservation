import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";

import { logout } from "../../../stores/accounts/actions/AuthActions";
import { USER } from '../../../constants/accounts/account_constants';
import { ManageTicketView } from '../components/manage_tickets/ManageTicketView';

const NavigationBar = ({ logout }) => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );
    const AuthenticatedUserId = useSelector((state) => state.auth.user !== null ? state.auth.user.id : null);

    const userEmail = useSelector(
        (state) => state.auth.user !== null ? state.auth.user.email : null
    );

    const [showTicketDialog, setShowTicketDialog] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const [displayTicketDetialsModal, setDisplayTicketDetialsModal] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        setDisplayTicketDetialsModal(true);
        setShowTicketDialog(false)
        setTicketNumber(data.ticketNumber)
    }

    const logoutUser = () => {
        logout()
    }
    const items = [
        {
            label: 'Giyobus',
            icon: 'pi pi-home pi-align-left',
            command: () => {
                window.location.href = '/'
            },
        }
    ];
    if (isAuthenticated && userEmail !== null) {
        const authItems = {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                logoutUser();
            }
        }
        const email = {
            label: userEmail,
            icon: 'pi pi-fw pi-user'
        }
        const manageBooking = {
            label: 'Manage Booking',
            icon: 'pi pi-fw pi-ticket',
            items: [
                {
                    label: 'Show My Ticket',
                    icon: 'pi pi-fw pi-align-left',
                    command: () => {
                        setShowTicketDialog(true)
                    },
                },
                {
                    label: 'Manage Booking',
                    icon: 'pi pi-fw pi-align-right',
                    command: () => {
                        window.location.href = `/manageBooking/${AuthenticatedUserId}`
                    },
                },
            ]
        }
        items.push(manageBooking)
        items.push(authItems)
        items.push(email)
    }
    else {
        const usersRegistration = {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Login',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => {
                        window.location.href = '/login'
                    }
                },
                {
                    label: 'Register',
                    icon: 'pi pi-fw pi-user-minus',
                    command: () => {
                        window.location.href = `/signup/${USER}`
                    }
                },
            ]
        }
        items.push(usersRegistration)
    }

    //ticket modal code
    const onHide = () => {
        setShowTicketDialog(false)
        setDisplayTicketDetialsModal(false)
    }


    const getTicketDetailsModal = () => {
        if (displayTicketDetialsModal) {
            return ticketNumber ? <ManageTicketView ticketNo={ticketNumber} showDialog={displayTicketDetialsModal} onHide={onHide} /> : null
        }
    }

    const getTicketModal = () => {
        return (<Dialog visible={showTicketDialog} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '28vw' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Enter Ticket Number</h3>
                <InputText {...register("ticketNumber", { required: true })} className='w-full' />
                {errors.ticketNumber && <span style={{color:"red"}}>Ticket number is required</span>}
                <div className='flex justify-content-end mt-4'>
                    <Button label="Cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                    <Button type='submit' label="Get Ticket" icon="pi pi-check" autoFocus />
                </div>
            </form>

        </Dialog>)
    }
    // // end of ticket modal code

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = null
    return (
        <>
            <Menubar model={items} start={start} end={end} />
            {isAuthenticated && userEmail !== null && showTicketDialog && !displayTicketDetialsModal ? getTicketModal() : null}
            {isAuthenticated && userEmail !== null && !showTicketDialog && displayTicketDetialsModal ? getTicketDetailsModal() : null}
        </>
    );
}

export default connect(null, { logout })(NavigationBar);