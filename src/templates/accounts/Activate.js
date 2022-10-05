import React, { useState } from 'react';
import { Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../stores/accounts/actions/AuthActions';
import { useParams } from 'react-router-dom';
import { Button } from "primereact/button";

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    const { uid, token } = useParams();
    const verify_account = e => {
        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Navigate  to='/' />
    }

    return (
        <div className=''>
            <div className='grid text-center'>
            <div className="col-4"></div>
                <div className='col-4 container mt-8 shadow-4'>
                <h1>Verify your Account:</h1>
                <Button type="submit" label="Verify" className='mb-4' onClick={verify_account}/>
                </div>
                <div className="col-4"></div>
               </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
