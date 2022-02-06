import { FaLightbulb, FaBriefcaseMedical, FaPhoneVolume } from "react-icons/fa";
import { Card } from "primereact/card";

export const BusDetailsCard = () => {
  return (
    <>
      <Card className="shadow-5" style={{ width: "100%" }}>
        <div className="grid">
          <div className="col-2">
            <img
              src=""
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
                  <li className="text-xl font-medium">Ganesh Travels</li>
                  <li>From : Karad</li>
                  <li>A/C Sleeper</li>
                  <li>Amenities</li>
                </ul>
              </div>

              <div className="col-3">
              
                <ul style={{ listStyleType: "none" }}>
                  <li>To: Pune</li>
                  <li>Departure time: 1:00 p.m</li>
                  <li>Arrival time: 4:00 p.m</li>
                  <li>Time: 3 hrs</li>
                </ul>
              </div>

              <div className="col-3">
              
                <ul style={{ listStyleType: "none" }}>
                  <li>Date: 12/11/2022</li>
                  <li>INR: 100</li>
                  <li>Bus No: Mh 54 ba 2342</li>
                  <li>Available Seats: 12</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
