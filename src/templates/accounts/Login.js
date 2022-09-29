import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../stores/accounts/actions/AuthActions";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
// prime React
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
// react hook form
import { useForm, Controller } from "react-hook-form";
import { USER } from "../../constants/accounts/account_constants";

import { Footer } from "../user_view/assets/Footer";

const Login = ({ login, isAuthenticated, isAgent,loadUser }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (e) => {
    setFormData(e);
  };

  useEffect(() => {
    if (Object.values(formData).length > 0) {
      login(formData.email, formData.password);
    }
  }, [login, formData]);

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) { }
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/auth/o/facebook/?redirect_uri=http://localhost:3000/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) { }
  };
 useEffect(()=>{
  if (isAuthenticated && isAgent !== undefined && isAgent !== null && isAgent ) {
    navigate('/agentView');
  }
  else if(isAuthenticated){
    navigate('/');
  }
 }, [loadUser])
  

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <>
      <div className="form-account mt-8">
        <div className="text-center">
          <div className="grid">
            <div className="col-4"></div>
            <div className="col-4">
            <div className="sign-up shadow-4">
                <div className="my-5 mx-6">
                  <h1>Login</h1>
                  <span className="text-600 font-medium line-height-3">
                    Don't have an account?<Button type="button" label="Create today!" className="p-button-link" onClick={()=>navigate(`/signup/${USER}`)}/>

                  </span>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field mt-4">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required.",
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
                    <div className="field mt-4">
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
                              feedback={false}
                              name="password"
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
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
                    <Button type="submit" label="Login" className="mt-2" />

                    <div className="grid">
                      <div className="col">
                        <Button
                          type="button"
                          className="p-button-outlined p-button-secondary mt-3 shadow-2"
                          onClick={continueWithGoogle}
                          style={{ width: "100%" }}
                        >
                          <FcGoogle size={20} />
                          <span className="ml-3">Google</span>
                        </Button>
                      </div>
                      <div className="col">
                        <Button
                          className="p-button-outlined p-button-secondary mt-3 shadow-2"
                          onClick={continueWithFacebook}
                          style={{ width: "100%" }}
                        >
                          <BsFacebook size={20} />
                          <span className="ml-3">Facebook</span>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      Forgot your Password?
                      <Link to="/reset-password">Reset Password</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>
      <br/>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAgent: state?.auth?.user?.is_agent,
  loadUser: state?.auth?.user
});

export default connect(mapStateToProps, { login })(Login);
