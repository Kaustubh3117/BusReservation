import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useForm, Controller } from "react-hook-form";
import { Divider } from "primereact/divider";

export const Passenger = () => {
  const [radioValue, setRadioValue] = useState("");
  const [formData, setFormData] = useState({});

  const defaultValues = {
    name: "",
    mobileNumber: "",
    gender: "",
    age: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (e) => {
    setFormData(e);
  };
  const seatCount = useSelector(
    (state) => state.seat_data.seatData.seatData.seatNumber
  );

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const radios = [
    { name: "Male", value: "1" },
    { name: "Female", value: "2" },
  ];

  console.log("radio value..", radioValue);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        {seatCount.map((element, index) => (
          <>
            <h4 className="d-flex flex-row justify-content-between">
              Passenger {` 0${index + 1}`}
            </h4>
            <div className="grid">
              <div className="col">
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="name"
                      className={classNames({ "p-error": errors.name })}
                    >
                      Full Name*
                    </label>
                  </span>
                  {getFormErrorMessage("name")}
                </div>
              </div>
              <div className="col">
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="mobileNumber"
                      control={control}
                      rules={{ required: "Mobile Number is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="mobileNumber"
                      className={classNames({ "p-error": errors.mobileNumber })}
                    >
                      Mobile Number*
                    </label>
                  </span>
                  {getFormErrorMessage("mobileNumber")}
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="col-6">
                <div className="field-radiobutton">
                  {radios.map((radio, idx) => (
                    <>
                      <RadioButton
                        inputId={`gender-${idx}`}
                        name="gender"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) =>
                          e.currentTarget !== undefined
                            ? setRadioValue(e.currentTarget.value)
                            : ""
                        }
                      />
                      <label htmlFor="gender"> {radio.name}</label>
                    </>
                  ))}
                </div>
              </div>
              <div className="col-6">
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="age"
                      control={control}
                      rules={{ required: "Age is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                        />
                      )}
                    />
                    <label
                      htmlFor="age"
                      className={classNames({ "p-error": errors.age })}
                    >
                      Age*
                    </label>
                  </span>
                  {getFormErrorMessage("age")}
                </div>
              </div>
            </div>
            <Divider />
          </>
        ))}
      </form>
    </>
  );
};
