import { FaLightbulb, FaBriefcaseMedical, FaPhoneVolume } from "react-icons/fa";
import { Card } from "primereact/card";

export const BusDetailsCard = (props) => {
  console.log("props: ", props);
  return (
    <>
      <Card className="shadow-5 mt-4" style={{ width: "100%" }}>
        <div className="grid">
          <div className="col-2">
            <img
              src={props.props.bus_id.image}
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
                  <li className="text-xl font-medium">{props.props.bus_id.bus_name}</li>
                  <li>From : {props.props.fromLocation}</li>
                  <li>{props.props.bus_id.bus_type}</li>
                  <li>Amenities</li>
                </ul>
              </div>

              <div className="col-3">
              
                <ul style={{ listStyleType: "none" }}>
                  <li>To: {props.props.toLocation}</li>
                  <li>Departure time: {props.props.departure_time}</li>
                  <li>Arrival time:{props.props.arrival_time}</li>
                  <li>Time: {props.props.journey_time}</li>
                </ul>
              </div>

              <div className="col-3">
              
                <ul style={{ listStyleType: "none" }}>
                  <li>Date: {props.props.trip_date}</li>
                  <li>INR: {props.props.price}</li>
                  <li>Bus No:{props.props.bus_id.bus_no}</li>
                  <li>Available Seats: {props.props.available_seat}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
