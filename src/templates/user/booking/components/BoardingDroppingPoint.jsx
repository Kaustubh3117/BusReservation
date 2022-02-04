import React, { useState, useEffect } from "react";
import { Tabs, Tab, ToggleButton, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSeatData } from "../../../../stores/users/actions/SeatAction";

export const BoardingDroppingPoint = (props) => {
  //props.bpDpVals.boardingPointProps
  //props.bpDpVals.droppingPointProps
  const reduxSeatDataState = useSelector((state) => state.seat_data.seatData);
  let checkIfBpPresent = false;
  let checkIfDpPresent = false;
  if (typeof props.bpDpVals === "object" && props.bpDpVals !== null) {
    checkIfBpPresent = "boardingPointProps" in props.bpDpVals;
    checkIfDpPresent = "droppingPointProps" in props.bpDpVals;
  }

  const [key, setKey] = useState("boardingPoint");
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        classNameName="mb-3"
      >
        <Tab eventKey="boardingPoint" title="Boading Point">
          {key === "boardingPoint"
            ? RadioButtonValues(
                props.bpDpVals.boardingPointProps,
                checkIfBpPresent ? "boardingPoint" : null
              )
            : null}
        </Tab>
        <Tab
          eventKey="droppingPoint"
          title="Dropping Point"
          disabled={
            reduxSeatDataState &&
            reduxSeatDataState.point !== undefined &&
            reduxSeatDataState.point.boardingPointRadio.value !== ""
              ? false
              : true
          }
        >
          {key === "droppingPoint"
            ? RadioButtonValues(
                props.bpDpVals.droppingPointProps,
                checkIfDpPresent ? "droppingPoint" : null
              )
            : null}
        </Tab>
        {/* <Tab eventKey="contact" title="Contact" disabled>
           <h1>Disabled</h1>
           </Tab> */}
      </Tabs>
    </>
  );
};

const RadioButtonValues = (values, type) => {
  console.log(
    "🚀 ~ file: BoardingDroppingPoint.jsx ~ line 46 ~ RadioButtonValues ~ values",
    values
  );
  const reduxSeatDataState = useSelector((state) => state.seat_data.seatData);
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
            {/* //boostrap radio buttons */}
            <br />
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value={radio.value}
                name="radio"
                id={`radio-${idx}`}
                checked={
                  type === "boardingPoint"
                    ? boardingPointRadio.value === radio.value
                    : droppingPointRadio.value === radio.value
                  // reduxSeatDataState.point.boardingPointRadio.value!==''? reduxSeatDataState.point.boardingPointRadio.value === radio.value : boardingPointRadio.value === radio.value
                }
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
              <label className="form-check-label" for={`radio-${idx}`}>
                {radio.name}
              </label>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
