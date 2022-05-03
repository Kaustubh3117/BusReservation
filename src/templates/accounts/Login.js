import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../stores/accounts/actions/AuthActions";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
// prime React
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
// react hook form
import { useForm, Controller } from "react-hook-form";
import { USER } from "../../constants/accounts/account_constants";

const Login = ({ login, isAuthenticated, isAgent }) => {
  const [formData, setFormData] = useState({});
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
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

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
              <Card className="shadow-4">
                <div className="my-5 mx-6">
                  <h1>Login</h1>
                  <span className="text-600 font-medium line-height-3">
                    Don't have an account?
                  </span>
                  <a
                    className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                    href={`/signup/${USER}`}
                  >
                    Create today!
                  </a>
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
  isAgent: state?.auth?.user?.is_agent
});

export default connect(mapStateToProps, { login })(Login);
