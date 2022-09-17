
import React from "react";
export class PrintTicket extends React.Component {
    render() {
        const tableStyle={
            border:"1px solid black",
            width:'100%'
        }
        const cellStyle ={
            border:"1px solid black",
        }
      return (
        <div>
          <h2 style={{color: "green"}}>Giyobus</h2>
          <table style={tableStyle}>
            <thead style={cellStyle}>
              <th style={cellStyle}>Passenger Name</th>
              <th style={cellStyle}>Giyobus Ticket Number#</th>
              <th style={cellStyle}>Seat Number</th>
              <th style={cellStyle}>Bus Number</th>
            </thead>
            <tbody style={cellStyle}>
              <tr style={cellStyle}>
                <td style={cellStyle}>Ganesh</td>
                <td style={cellStyle}>Ticket Number</td>
                <td style={cellStyle}>{this.props.ticketData[0].seat_no}</td>
                <td style={cellStyle}>{this.props.ticketData[0].trip_schedule_id.bus_id.bus_no}</td>
              </tr>
            </tbody>
          </table>

          <table className="mt-4" style={tableStyle}>
            <thead>
              <th style={cellStyle}>Bus Type</th>
              <th style={cellStyle}>Reporting Time</th>
              <th style={cellStyle}>Boarding Point Address</th>
              <th style={cellStyle}>Total Fare</th>
              <th style={cellStyle}>Departure Time</th>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>{this.props.ticketData[0].trip_schedule_id.bus_id.bus_type}</td>
                <td style={cellStyle}>{this.props.ticketData[0].trip_schedule_id.departure_time} -15min</td>
                <td style={cellStyle}>{this.props.ticketData[0].boarding_point}</td>
                <td style={cellStyle}>{this.props.ticketData[0].total_amount}</td>
                <td style={cellStyle}>{this.props.ticketData[0].trip_schedule_id.departure_time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }