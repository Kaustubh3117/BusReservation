import { FaLightbulb, FaBriefcaseMedical, FaPhoneVolume } from "react-icons/fa";
import { Card } from "primereact/card";

export const BusDetailsCard = (props) => {
  console.log("Available busses props: ", props);
  return (
    <>
      <Card className="shadow-5 mt-4" style={{ width: "100%" }}>
        <div className="grid">
          <div className="col-2">
            <img
              src={props.data.bus_id.image}
              className="mobile_image"
              height="100px"
              width="100px"
              alt="img"
            />
          </div>
          <div className="col-10">
            <div className="grid">
              <div className="col-3">
            
                <ul style={{ listStyleType: "none" }}>
                  <li className="text-xl font-medium">{props.data.bus_id.bus_name}</li>
                  <li>From : {props.data.fromLocation}</li>
                  <li>{props.data.bus_id.bus_type}</li>
                  <li>Amenities</li>
                </ul>
              </div>

              <div className="col-3">
              
                <ul style={{ listStyleType: "none" }}>
                  <li>To: {props.data.toLocation}</li>
                  <li>Departure time: {props.data.departure_time}</li>
                  <li>Arrival time:{props.data.arrival_time}</li>
                  <li>Time: {props.data.journey_time}</li>
                </ul>
              </div>

              <div className="col-3">
              
                <ul style={{ listStyleType: "none" }}>
                  <li>Date: {props.data.trip_date}</li>
                  <li>INR: {props.data.price}</li>
                  <li>Bus No:{props.data.bus_id.bus_no}</li>
                  <li>Available Seats: {props.data.available_seat}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
