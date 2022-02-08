import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../stores/accounts/actions/AuthActions";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { useForm, Controller } from "react-hook-form";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const { uid, token } = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordMatched, setPasswordMatched] = useState(false);
  const defaultValues = {
    new_password: "",
    re_new_password: "",
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
    if (
      Object.values(formData).length > 0 &&
      formData.new_password === formData.re_new_password
    ) {
      reset_password_confirm(
        uid,
        token,
        formData.new_password,
        formData.re_new_password
      );
      setRequestSent(true);
    } else if (
      Object.values(formData).length > 0 &&
      formData.new_password !== formData.re_new_password
    ) {
      setPasswordMatched(true);
    }
  }, [formData]);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
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

  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="form-account mt-8">
        <div className="text-center">
          <div className="grid">
            <div className="col-4"></div>
            <div className="col-4">
              <Card className="shadow-4">
                <div className="my-5 mx-6">
                  <h1>Reset Password</h1>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field mt-5">
                      <span className="p-float-label">
                        <Controller
                          name="new_password"
                          control={control}
                          rules={{ required: "Password is required." }}
                          render={({ field, fieldState }) => (
                            <Password
                              id={field.name}
                              {...field}
                              toggleMask
                              name="new_password"
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              header={passwordHeader}
                              footer={passwordFooter}
                            />
                          )}
                        />
                        <label
                          htmlFor="new_password"
                          className={classNames({
                            "p-error": errors.new_password,
                          })}
                        >
                          Password*
                        </label>
                      </span>
                      {getFormErrorMessage("new_password")}
                    </div>
                    <div className="field mt-5">
                      <span className="p-float-label">
                        <Controller
                          name="re_new_password"
                          control={control}
                          rules={{ required: "Confirm Password is required." }}
                          render={({ field, fieldState }) => (
                            <Password
                              id={field.name}
                              {...field}
                              toggleMask
                              name="re_new_password"
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                            />
                          )}
                        />
                        <label
                          htmlFor="re_new_password"
                          className={classNames({
                            "p-error": errors.re_new_password,
                          })}
                        >
                          Confirm Password*
                        </label>
                      </span>
                      {getFormErrorMessage("re_new_password")}

                      {passwordMatched ? (
                        <small className="p-error">
                          Password did not matched
                        </small>
                      ) : null}
                    </div>
                    <Button
                      type="submit"
                      label="Confirm Reset Password"
                      className="mt-2"
                    />
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
