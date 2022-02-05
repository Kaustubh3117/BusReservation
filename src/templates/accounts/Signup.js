import React, { useState, useEffect } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../stores/accounts/actions/AuthActions';
import axios from 'axios';
import { backendUrl } from '../../environment/development';
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from 'react-icons/bs'

// prime React
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
// react hook form
import { useForm, Controller } from "react-hook-form";


const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [formData, setFormData] = useState({});

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (e) => {
    setFormData(e);
  };

  useEffect(()=>{
    if (Object.values(formData).length > 0 && formData.password === formData.re_password) {
        signup(formData.first_name, formData.last_name, formData.email, formData.password, formData.re_password);
        setAccountCreated(true);
    }
    else if(Object.values(formData).length > 0 && formData.password !== formData.re_password){
        setPasswordMatched(true)
    }
  }, [signup,formData])

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

    const getFormErrorMessage = (name) => {
        return (
          errors[name] && <small className="p-error">{errors[name].message}</small>
        );
      };

    //   password tamplte
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <>
    <div className="form-account">
        <div className="flex justify-content-center text-center">
          <div className="card">
            <div className="my-5 mx-6">
            <h5>Registration</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
                            <span className="p-float-label">
                                <Controller name="first_name" control={control} rules={{ required: 'First Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="first_name" className={classNames({ 'p-error': errors.name })}>First Name*</label>
                            </span>
                            {getFormErrorMessage('first_name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="last_name" control={control} rules={{ required: 'Last Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="last_name" className={classNames({ 'p-error': errors.name })}>Last Name*</label>
                            </span>
                            {getFormErrorMessage('last_name')}
                        </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message:
                          "Invalid email address. E.g. example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        name="email"
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({ "p-error": !!errors.email })}
                  >
                    Email*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required." }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        toggleMask
                        name="password"
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        header={passwordHeader} footer={passwordFooter}
                      />
                    )}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({ "p-error": errors.password })}
                  >
                    Password*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="re_password"
                    control={control}
                    rules={{ required: "Confirm Password is required." }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        toggleMask
                        name="re_password"
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="re_password"
                    className={classNames({ "p-error": errors.re_password })}
                  >
                    Confirm Password*
                  </label>
                </span>
                {getFormErrorMessage("re_password")}

                {passwordMatched?<small className="p-error">Password did not matched</small>: null}
              </div>

              <Button type="submit" label="Register" className="mt-2" />

              <div className="grid">
                <div className="col">
                  <button
                    className="btn btn-light mt-3 shadow"
                    onClick={continueWithGoogle}
                    style={{ width: "100%" }}
                  >
                    <FcGoogle size={20} />
                    <span className="ml-3">Google</span>
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-light mt-3 shadow"
                    onClick={continueWithFacebook}
                    style={{ width: "100%" }}
                  >
                    <BsFacebook size={20} />
                    Facebook
                  </button>
                </div>
              </div>
              <div className='mt-3'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </div>
            </form>
            </div>
           
          </div>
        </div>
      </div>
         
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
