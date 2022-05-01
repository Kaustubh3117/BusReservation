import { Button } from "primereact/button";
export const SeatColorDetails = () => {
  return (
    <div className="card mb-2" style={{ width: "10rem" }}>
      <div className="ml-1">
        <div className="mt-1">
          {" "}
          <Button className="p-button-rounded p-button-secondary w-2 h-1rem" />
          Selected Seat
        </div>
        <div className="mt-1">
          {" "}
          <Button className="p-button-rounded p-button-success w-2 h-1rem" />
          Available Seat
        </div>
        <div className="mt-1 mb-1">
          {" "}
          <Button className="p-button-rounded p-button-danger w-2 h-1rem" />
          Reserved Seat
        </div>
      </div>
    </div>
  );
};
