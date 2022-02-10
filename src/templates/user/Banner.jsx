import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// prime React
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { changeKeysFromObject } from "./UserHelper";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";

const Banner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [boardingPointRes, setBoardingPointRes] = useState(null);
  const [droppingPointRes, setDroppingPointRes] = useState(null);
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
    axios
      .get("http://127.0.0.1:8000/api/boarding_point/")
      .then(function (response) {
        const resData = changeKeysFromObject(response.data);
        setBoardingPointRes(resData);
      })
      .catch(function (error) {
        console.log("Boarding Point Error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dropping_point/")
      .then(function (response) {
        const resData = changeKeysFromObject(response.data);
        setDroppingPointRes(resData);
      })
      .catch(function (error) {
        console.log("dropping error...", error);
      });
  }, []);

  useEffect(() => {
    if (Object.values(formData).length > 0) {
      navigate("/buslist", {
        state: {
          start_location: formData.start_location.name,
          end_location: formData.end_location.name,
          date: formData.date,
        },
      });
    }
  }, [navigate, formData]);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <>
      <div className="bg-indigo-200 surface-0 text-800">
        <div className=" p-6 text-center">
          <section>
            <span className="block text-6xl font-bold mb-1">Giyobus</span>
            <div className="text-6xl text-primary font-bold mb-3">
              your visitors deserve to see
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

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
                          <Controller
                            name="start_location"
                            control={control}
                            render={({ field }) => (
                              <Dropdown
                                id={field.name}
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                options={boardingPointRes}
                                optionLabel="name"
                                className={classNames({
                                  "p-invalid": fieldState.invalid,
                                })}
                                editable
                                showClear
                                filter="name"
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
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            options={droppingPointRes}
                            optionLabel="name"
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            editable
                            filter="name"
                            showClear
                          />
                        )}
                      />
                      <label
                        htmlFor="end_location"
                        className={classNames({
                          "p-error": errors.end_location,
                        })}
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
          </section>
        </div>
      </div>
    </>
  );
};

export default Banner;
