import { FaLightbulb, FaBriefcaseMedical, FaPhoneVolume } from "react-icons/fa";
import {RiBattery2ChargeFill} from "react-icons/ri";
import { Card } from "primereact/card";
import { Image } from 'primereact/image';

export const BusDetailsCard = (props) => {
  return (
    <>
      <Card className="shadow-5 mt-2" style={{ width: "100%" }}>
        <div className="grid">
          <div className="sm:col-6 md:col-2 lg:col-2">
            <Image src={props.data.bus_id.image} template="Preview Content" alt="Image Text" width="150" />
          </div>
          <div className="col-10">
            <div className="grid">
              <div className="sm:col-6 md:col-6 lg:col-3">
                <ul style={{ listStyleType: "none" }}>
                  <li className="text-xl font-medium">{props.data.bus_id.bus_name}</li>
                  <li><b>From:</b> {props.data.fromLocation}</li>
                  <li><b>To:</b> {props.data.toLocation}</li>
                </ul>
              </div>

              <div className="sm:col-6 md:col-6 lg:col-3">
                <ul style={{ listStyleType: "none" }}>
                <li><b>Date:</b> {props.data.trip_date}</li>
                  <li><b>Departure time:</b> {props.data.departure_time}</li>
                  <li><b>Arrival time:</b>{props.data.arrival_time}</li>
                  <li><b>Time: </b>{props.data.journey_time}</li>
                </ul>
              </div>

              <div className="sm:col-6 md:col-6 lg:col-3">
                <ul style={{ listStyleType: "none" }}>
                  <li><b>Bus No:</b>{props.data.bus_id.bus_no}</li>
                  <li><b>Bus Type:</b> {props.data.bus_id.bus_type}</li>
                  <li><b>Available Seats: </b>{props.data.available_seat}</li>
                </ul>
              </div>
              <div className="sm:col-6 md:col-6 lg:col-3">
              <ul style={{ listStyleType: "none" }}>
              <li><b>INR:</b> {props.data.price}</li>
              <br/>
              <li><b>Amenities: <FaLightbulb color="yellow" /> <FaBriefcaseMedical color="blue"/> <FaPhoneVolume color="red"/> <RiBattery2ChargeFill color="green"/></b></li>
                </ul>
                </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
