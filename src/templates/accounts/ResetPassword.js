import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../stores/accounts/actions/AuthActions";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import {Footer} from '../user_view/assets/Footer'
const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({});
  const defaultValues = {
    email: "",
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
      reset_password(formData.email);
      setRequestSent(true);
    }
  }, [formData]);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="form-account mt-8">
        <div className="text-center">
          <div className="grid">
            <div className="col-4"></div>
            <div className="sm:col-6 lg:col-4">
              <Card className="shadow-4">
                <div className="my-5 mx-6">
                  <h1>Request Password Reset</h1>
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
                    <Button
                      type="submit"
                      label="Reset Password"
                      className="mt-2"
                    />
                  </form>
                </div>
              </Card>
            </div>
            <div className="sm:col-6 lg:col-4"></div>
          </div>
        </div>
      </div>
      <br/>
      <Footer />
    </>
  );
};

export default connect(null, { reset_password })(ResetPassword);
