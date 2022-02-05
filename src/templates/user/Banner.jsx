import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// prime React
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
// react hook form
import { useForm, Controller } from "react-hook-form";

const Banner = () => {
  // const [startLocation, setStartLocation] = useState("");
  // const [endLocation, setEndLocation] = useState("");
  // const [date, setDate] = useState("");

  // prime react
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const defaultValues = {
    start_location: "",
    end_location: "",
    date: "",
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
   
    console.log("formData..", formData);
    if (Object.values(formData).length > 0) {
    
      navigate('/buslist', { state: { start_location: formData.start_location.name, end_location: formData.end_location.name, date:formData.date } });
      // <Navigate
      //   to={`/buslist/${formData.start_location.name}/${formData.end_location.name}/${formData.date}`}
      // />;
    }
  }, [navigate, formData]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`The name you entered was: ${date}`);
  // };
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <>
      {/* <Container>
      <Row>
          
      <Form  onSubmit={handleSubmit}>  
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>From Location</Form.Label>
          <Form.Control type="FromLocation" placeholder="From"
           onChange={(e) => setStartLocation(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>To Location</Form.Label>
          <Form.Control type="ToLocation" placeholder="To" 
          onChange={(e) => setEndLocation(e.target.value)}
          />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" 
          onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Link className="btn btn-primary" type="submit" to={`/buslist/${startLocation}/${endLocation}/${date}`}>Check Availability</Link>
      </Form>
      </Row>
      </Container> */}

      {/* <li><a href="/buslist">buslist</a></li> */}

      {/* prime react */}
      <div className="form-account">
        <div className="">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="my-5 mx-6 formgrid grid">
                <div className="field col-3 md:col-6 lg:col-3">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-arrow-up-right" />
                    <Controller
                      name="start_location"
                      control={control}
                      rules={{ required: "Start Location is required." }}
                      render={({ field, fieldState }) => (
                        // <InputText
                        //   id={field.name}
                        //   {...field}
                        //   autoFocus
                        // className={classNames({
                        //   "p-invalid": fieldState.invalid,
                        // })}
                        // />
                        <Controller
                          name="start_location"
                          control={control}
                          render={({ field }) => (
                            <Dropdown
                              id={field.name}
                              value={field.value}
                              onChange={(e) => field.onChange(e.value)}
                              options={cities}
                              optionLabel="name"
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              editable
                              showClear
                            />
                          )}
                        />
                      )}
                    />
                    <label
                      htmlFor="start_location"
                      className={classNames({
                        "p-error": errors.start_location,
                      })}
                    >
                      Start Location*
                    </label>
                  </span>
                  {getFormErrorMessage("start_location")}
                </div>
                <div className="field col-3 md:col-6 lg:col-3">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-arrow-down-right" />
                    <Controller
                      name="end_location"
                      control={control}
                      rules={{ required: "End Location is required." }}
                      render={({ field, fieldState }) => (
                        // <InputText
                        //   id={field.name}
                        //   {...field}
                        //   autoFocus
                        //   className={classNames({
                        //     "p-invalid": fieldState.invalid,
                        //   })}
                        // />
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={cities}
                          optionLabel="name"
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          editable
                          showClear
                        />
                      )}
                    />
                    <label
                      htmlFor="end_location"
                      className={classNames({ "p-error": errors.end_location })}
                    >
                      End Location*
                    </label>
                  </span>
                  {getFormErrorMessage("end_location")}
                </div>
                <div className="field col-3 md:col-6 lg:col-3">
                  <span className="p-float-label">
                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: "Date is required." }}
                      render={({ field, fieldState }) => (
                        <Calendar
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                        />
                      )}
                    />
                    <label
                      htmlFor="date"
                      className={classNames({ "p-error": errors.date })}
                    >
                      Date*
                    </label>
                  </span>
                  {getFormErrorMessage("date")}
                </div>
                <div className="col-3 md:col-6 lg:col-3">
                  <Button type="submit" label="Check Availability" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// const handleSubmit = (event) => {
//     alert('A name was submitted: ' + event);
//     event.preventDefault();
//   };

export default Banner;
