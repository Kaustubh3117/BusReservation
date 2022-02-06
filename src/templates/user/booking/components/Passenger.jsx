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
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useForm, Controller } from "react-hook-form";
import { Divider } from 'primereact/divider';

export const Passenger = () => {
  // const [formValues, setFormValues] = useState([
  //   { name: "", mobileNumber: "" },
  // ]);
  const [radioValue, setRadioValue] = useState("1");

  // prime react
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

  //get redux state
  const seatCount = useSelector(
    (state) => state.seat_data.seatData.seatData.seatNumber
  );

  // let handleChange = (i, e) => {
  //   let newFormValues = [...formValues];
  //   newFormValues[i][e.target.name] = e.target.value;
  //   setFormValues(newFormValues);
  // };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  // let addFormFields = () => {
  //   setFormValues([...formValues, { Name: "", MobileNumber: "" }]);
  // };

  // let removeFormFields = (i) => {
  //   let newFormValues = [...formValues];
  //   newFormValues.splice(i, 1);
  //   setFormValues(newFormValues);
  // };

  // let handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(JSON.stringify(formValues));
  // };

  const radios = [
    { name: "Male", value: "1" },
    { name: "Female", value: "2" },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        {seatCount.map((element, index) => (
          <>
            {/* prime react */}
            <h4 className="d-flex flex-row justify-content-between">
                Passenger {` 0${index + 1}`}
              </h4>
            <div className="grid">
             
              <div className="col-6">
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
              <div className="col-6">
              <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="mobileNumber"
                      control={control}
                      rules={{ required: "Mobile Number is required." }}
                      render={({ field, fieldState }) => (
                        // <InputText
                        //   id={field.name}
                        //   {...field}
                        //   autoFocus
                        //   className={classNames({
                        //     "p-invalid": fieldState.invalid,
                        //   })}
                        // />
                        <InputNumber  id={field.name} {...field} autoFocus className={classNames({
                          "p-invalid": fieldState.invalid,
                        })} />
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
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
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
                        <InputNumber  id={field.name} {...field} autoFocus className={classNames({
                          "p-invalid": fieldState.invalid,
                        })} />
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
