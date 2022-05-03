import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeatData } from "../../../../../stores/users/actions/UserAction";
import { TabView, TabPanel } from "primereact/tabview";
import { RadioButton } from "primereact/radiobutton";

export const BoardingDroppingPoint = (props) => {
  const reduxSeatDataState = useSelector((state) => state.user_data.seatData);
  const [activeIndex, setActiveIndex] = useState(0);
  let checkIfBpPresent = false;
  let checkIfDpPresent = false;
  if (typeof props.bpDpVals === "object" && props.bpDpVals !== null) {
    checkIfBpPresent = "boardingPointProps" in props.bpDpVals;
    checkIfDpPresent = "droppingPointProps" in props.bpDpVals;
  }
  return (
    <>
      <div className="card">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Boarding Point">
            {activeIndex === 0
              ? RadioButtonValues(
                  props.bpDpVals.boardingPointProps,
                  checkIfBpPresent ? "boardingPoint" : null
                )
              : null}
          </TabPanel>
          <TabPanel
            header="Dropping Point"
            disabled={
              reduxSeatDataState &&
              reduxSeatDataState.point !== undefined &&
              reduxSeatDataState.point.boardingPointRadio.value !== ""
                ? false
                : true
            }
          >
            {activeIndex === 1
              ? RadioButtonValues(
                  props.bpDpVals.droppingPointProps,
                  checkIfDpPresent ? "droppingPoint" : null
                )
              : null}
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

const RadioButtonValues = (values, type) => {
  const reduxSeatDataState = useSelector((state) => state.user_data.seatData);
  const dispatch = useDispatch();
  const [boardingPointRadio, setBoardingPointRadio] = useState({
    name: "",
    value: "",
    type: "boardingPoint",
  });
  const [droppingPointRadio, setDroppingPointRadio] = useState({
    name: "",
    value: "",
    type: "droppingPoint",
  });

  useEffect(() => {
    if (
      reduxSeatDataState &&
      reduxSeatDataState.point !== undefined &&
      reduxSeatDataState.point.boardingPointRadio.value !== ""
    ) {
      setBoardingPointRadio(reduxSeatDataState.point.boardingPointRadio);
    }
    if (
      reduxSeatDataState &&
      reduxSeatDataState.point !== undefined &&
      reduxSeatDataState.point.droppingPointRadio.value !== ""
    ) {
      setDroppingPointRadio(reduxSeatDataState.point.droppingPointRadio);
    }
    const combineBpDp = { boardingPointRadio, droppingPointRadio };
    dispatch(setSeatData({ ...reduxSeatDataState, point: combineBpDp }));
  }, []);

  useEffect(() => {
    const combineBpDp = { boardingPointRadio, droppingPointRadio };
    dispatch(setSeatData({ ...reduxSeatDataState, point: combineBpDp }));
  }, [dispatch, boardingPointRadio, droppingPointRadio]);

  return (
    <>
      <div className="boardingDroppingScroll">
        {values.map((radio, idx) => (
          <>
            <br />
            <div className="field-radiobutton">
              <RadioButton
                inputId="city1"
                name="radio"
                id={`radio-${idx}`}
                checked={
                  type === "boardingPoint"
                    ? boardingPointRadio.value === radio.value
                    : droppingPointRadio.value === radio.value
                  // reduxSeatDataState.point.boardingPointRadio.value!==''? reduxSeatDataState.point.boardingPointRadio.value === radio.value : boardingPointRadio.value === radio.value
                }
                value={radio.value}
                onChange={(e) =>
                  type === "boardingPoint"
                    ? setBoardingPointRadio((prevState) => {
                        return {
                          ...prevState,
                          name: radio.name,
                          value: radio.value,
                          type: "boardingPoint",
                        };
                      })
                    : setDroppingPointRadio((prevState) => {
                        return {
                          ...prevState,
                          name: radio.name,
                          value: radio.value,
                          type: "droppingPoint",
                        };
                      })
                }
              />
              <label htmlFor={`radio-${idx}`}> {radio.name}</label>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
