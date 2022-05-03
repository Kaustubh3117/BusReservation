import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../stores/accounts/actions/AuthActions";
import axios from "axios";
import { backendUrl } from "../../environment/development";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

// prime React
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
// react hook form
import { useForm, Controller } from "react-hook-form";
import {USER} from "../../constants/accounts/account_constants"
import { AGENT } from "../../constants/accounts/account_constants";


const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    email: "",
    password: "",
    re_password: "",
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
    const url = window.location.pathname
    const urlSplit = url.split('/')
    const userType = urlSplit.pop()
    
    if (
      Object.values(formData).length > 0 &&
      formData.password === formData.re_password
    ) {
      signup(
        formData.email,
        formData.password,
        formData.re_password,
        userType === "AGENT" ? "True" : "False"
      );
      setAccountCreated(true);
    } else if (
      Object.values(formData).length > 0 &&
      formData.password !== formData.re_password
    ) {
      setPasswordMatched(true);
    }
  }, [signup, formData]);

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (accountCreated) {
    return <Navigate to={`/login/${USER}`} />;
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
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <>
      <div className="form-account mt-5">
        <div className=" text-center">
          <div className="grid">
            <div className="col-4"></div>
            <div className="col-4">
              <Card className="shadow-4">
                <div className="my-5 mx-6">
                  <h1>Registration</h1>
                  <span className="text-600 font-medium line-height-3">
                    Already have an account?
                  </span>
                  <a
                    className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                    href={`/login/${USER}`}
                  >
                    Sign In!
                  </a>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field mt-5">
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
                    <div className="field mt-5">
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
                              header={passwordHeader}
                              footer={passwordFooter}
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
                    <div className="field mt-5">
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
                          className={classNames({
                            "p-error": errors.re_password,
                          })}
                        >
                          Confirm Password*
                        </label>
                      </span>
                      {getFormErrorMessage("re_password")}

                      {passwordMatched ? (
                        <small className="p-error">
                          Password did not matched
                        </small>
                      ) : null}
                    </div>

                    <Button type="submit" label="Register" className="mt-2" />

                    <div className="grid">
                      <div className="col">
                        <Button
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
                      Are you an agent? <Link  to={`/signup/${AGENT}`}>Sign In</Link>
                      
                    </div>
                  </form>
                </div>
              </Card>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
