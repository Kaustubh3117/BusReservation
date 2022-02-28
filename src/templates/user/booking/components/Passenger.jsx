import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { useForm, Controller } from "react-hook-form";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { setPassengerData } from "../../../../stores/users/actions/UserAction";

export const Passenger = () => {
   const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState(null);
  const [formData, setFormData] = useState({});

  //new code for dynamic form 
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(0)
  const [age, setAge] = useState(0)

  // const defaultValues = {
  //   name: "",
  //   mobileNumber: "",
  //   gender: "",
  //   age: "",
  // };

  // const {
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm({ defaultValues });

  const onSubmit = (e) => {
    e.preventDefault()
  console.log("radio value..", radioValue);
  console.log("name...", name)
  console.log("mobile number...", mobileNumber)
  console.log("Age...", age)
  const payload = {
    name:name,
    mobileNumber: mobileNumber,
    gender: radioValue,
    age: age
  }
  dispatch(setPassengerData(payload))
  };
  const seatCount = useSelector(
    (state) => state.user_data.seatData.seatData.seatNumber
  );

  // const getFormErrorMessage = (name) => {
  //   return (
  //     errors[name] && <small className="p-error">{errors[name].message}</small>
  //   );
  // };

  const radios = [
    { name: "Male", value: "1" },
    { name: "Female", value: "2" },
  ];

  return (
    <>
      <form className="p-fluid">
        {seatCount.map((element, index) => (
          <>
            <h4 className="d-flex flex-row justify-content-between">
              Passenger {` 0${index + 1}`}
            </h4>
            <div className="grid">
              <div className="col">
                <div className="field">
                <span className="p-float-label">
                            <InputText id="name" value={name[`name${index + 1}`]} onChange={(e) => setName({...name, [`name${index + 1}`]:e.target.value})} />
                            <label htmlFor="name">Full Name</label>
                        </span>
                </div>
              </div>
              <div className="col">
                <div className="field">
                  <span className="p-float-label">
                  <InputNumber id="mobileNumber" name="mobileNumber" value={mobileNumber[`mobileNumber${index + 1}`]} onValueChange={(e) => setMobileNumber({...mobileNumber, [`mobileNumber${index + 1}`]:e.target.value})}  min={0} max={99999999999} />
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="col-6">
                <div className="field-radiobutton">
                  {radios.map((radio, idx) => (
                    <>
                      <RadioButton
                        inputId={`gender-${radio.value+(index + 1)}`}
                        name={` gender${index + 1}`}
                        value={radio.name+(index + 1)}
                        onChange={(e) =>
                             setRadioValue({...radioValue,[` gender${index + 1}`]:e.value})
                        }
                        checked={radioValue !== null? radioValue[` gender${index + 1}`] === radio.name+(index + 1): radio.name+(index + 1) === 'Male'}
                      />
                      <label htmlFor="gender">{radio.name}</label>
                    </>
                  ))}
                </div>
              </div>
              <div className="col-6">
                <div className="field">
                  <span className="p-float-label">
                  <InputNumber id="age" name="age" value={age[`age${index + 1}`]} onValueChange={(e) => setAge({...age, [`age${index + 1}`]:e.target.value})}  min={0} max={100} />
                  <label htmlFor="age">Age</label>
                  </span>
                 
                </div>
              </div>
            </div>
            <Divider />
          </>
        ))}
         <Button
          label="Next →"
          onClick={(e) => onSubmit(e)}
          className="w-3"
        />
      </form>
    </>
  );
};
