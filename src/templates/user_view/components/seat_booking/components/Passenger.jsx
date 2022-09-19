import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { setPassengerData, setShowNextModdal } from "../../../../../stores/users/actions/UserAction";
import { Button } from "primereact/button";

export const Passenger = () => {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState(null);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(0)
  const [age, setAge] = useState(0)

  useEffect(()=>{
    const payload = {
      name:name,
      mobileNumber: mobileNumber,
      gender: radioValue,
      age: age
    }
    dispatch(setPassengerData(payload))
  }, [name, mobileNumber, radioValue, age])

  const seatCount = useSelector(
    (state) => state.user_data.seatData.seatData.seatNumber
  );

  const radios = [
    { name: "Male", value: "1" },
    { name: "Female", value: "2" },
  ];

//   const showCheckoutForm=()=>{
// <CheckoutForm/>
//   }

  return (
    <>
      <form className="p-fluid" onSubmit={()=>{dispatch(setShowNextModdal(true))}}>
        {seatCount.map((element, index) => (
          <>
            <h4 className="d-flex flex-row justify-content-between">
              Passenger {` 0${index + 1}`}
            </h4>
            <div className="grid">
              <div className="col">
                <div className="field">
                <span className="p-float-label">
                            <InputText id="name" value={name[`name_${index + 1}`]} onChange={(e) => setName({...name, [`name_${index + 1}`]:e.target.value})} required/>
                            <label htmlFor="name">Full Name</label>
                        </span>
                </div>
              </div>
              <div className="col">
                <div className="field">
                  <span className="p-float-label">
                  <InputNumber id="mobileNumber" name="mobileNumber" value={mobileNumber[`mobileNumber_${index + 1}`]} onValueChange={(e) => setMobileNumber({...mobileNumber, [`mobileNumber_${index + 1}`]:e.target.value})}  min={0} max={99999999999} required />
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
                        name={`gender${index + 1}`}
                        value={radio.name+(index + 1)}
                        onChange={(e) =>
                             setRadioValue({...radioValue,[`gender_${index + 1}`]:e.value})
                        }
                        checked={radioValue !== null? radioValue[`gender_${index + 1}`] === radio.name+(index + 1): radio.name+(index + 1) === 'Male'}
                        required
                      />
                      <label htmlFor="gender">{radio.name}</label>
                    </>
                  ))}
                </div>
              </div>
              <div className="col-6">
                <div className="field">
                  <span className="p-float-label">
                  <InputNumber id="age" name="age" value={age[`age_${index + 1}`]} onValueChange={(e) => setAge({...age, [`age_${index + 1}`]:e.target.value})}  min={0} max={100} required/>
                  <label htmlFor="age">Age</label>
                  </span>
                </div>
              </div>
            </div>
            <Divider />
          </>
        ))}
        <Button label="Proceed to Payment" className="w-full mt-2 mb-4"/>
      </form>
    </>
  );
};
