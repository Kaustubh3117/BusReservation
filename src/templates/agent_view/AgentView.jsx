import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./assets/SideBar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { backendUrl } from "../../environment/development";
import {
  DashBoardColumns,
  TripScheduleColumns,
  BoardingColumns,
  DroppingColumns,
  TicketColumns,
  PasengerColumns,
} from "./AgentViewFields";

export const AgentView = () => {
  const isAgent = useSelector((state) => state?.auth?.user?.is_agent);
  const agentId = useSelector((state) => state?.auth?.user?.id);
  const [products, setProducts] = useState([]);
  const [showPointsDialog, setShowPointsDialog] = useState(false);
  const [boardingPointData, setBoardingPointData] = useState(null);
  const [droppingPointData, setDroppingPointData] = useState(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [ticketData, setTicketData] = useState(false);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAgent === undefined || !isAgent) {
      navigate("/login");
    }

    if (agentId) {
      axios
        .get(`${backendUrl}/agent_api/dash_board_view/${agentId}`)
        .then(function (response) {
          alert("data");
          setProducts(response.data);
        });
    }
  }, [isAgent]);

  useEffect(() => {
    if (isMounted.current) {
      // const summary =
      //   expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
      // toast.current.show({
      //   severity: "success",
      //   summary: `${summary}`,
      //   life: 3000,
      // });
    }
  }, [expandedRows]);

  useEffect(() => {
    isMounted.current = true;
    // setProducts(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    // toast.current.show({
    //   severity: "info",
    //   summary: "Product Expanded",
    //   detail: event.data.name,
    //   life: 3000,
    // });
  };

  const onRowCollapse = (event) => {
    // toast.current.show({
    //   severity: "success",
    //   summary: "Product Collapsed",
    //   detail: event.data.name,
    //   life: 3000,
    // });
  };

  //   const expandAll = () => {
  //       let _expandedRows = {};
  //       products.forEach(p => _expandedRows[`${p.id}`] = true);

  //       setExpandedRows(_expandedRows);
  //   }

  //   const collapseAll = () => {
  //       setExpandedRows(null);
  //   }
  const onHide = () => {
    setShowPointsDialog(false);
    setShowTicketDialog(false)
  };

  //footer for bp dp and ticket modals
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide()}
          autoFocus
        />
      </div>
    );
  };
   //end footer for bp dp and ticket modals

  // boaring dropping modal
  const showBpDpTemplate = () => {
    return (
      <div className="orders-subtable">
        {/* <h5>Orders for {data.name}</h5> */}
        <Dialog
          header="Header"
          visible={showPointsDialog}
          style={{ width: "50vw" }}
          footer={renderFooter()}
          onHide={() => onHide()}
        >
          <h1>Boarding Points</h1>
          <DataTable
            value={boardingPointData}
            responsiveLayout="scroll"
            showGridlines
          >
            {BoardingColumns.map((ele) => {
              return (
                <Column
                  field={ele.field}
                  header={ele.header}
                  sortable
                  headerStyle={{ width: "4rem" }}
                ></Column>
              );
            })}
          </DataTable>
          <h1>Dropping Point</h1>
          <DataTable
            value={droppingPointData}
            responsiveLayout="scroll"
            showGridlines
          >
            {DroppingColumns.map((ele) => {
              return (
                <Column
                  field={ele.field}
                  header={ele.header}
                  sortable
                  headerStyle={{ width: "4rem" }}
                ></Column>
              );
            })}
          </DataTable>
        </Dialog>
      </div>
    );
  };
  //!!!end boaring dropping modal

  // Ticket modal
  const ticketTemplate = () => {
    return (
      <div className="orders-subtable">
        {/* <h5>Orders for {data.name}</h5> */}
        <Dialog
          header="Header"
          visible={showTicketDialog}
          style={{ width: "50vw" }}
          footer={renderFooter()}
          onHide={() => onHide()}
        >
          <h1>Tickets</h1>
          <DataTable
            value={ticketData}
            responsiveLayout="scroll"
            showGridlines
          >
            {TicketColumns.map((ele) => {
              return (
                <Column
                  field={ele.field}
                  header={ele.header}
                  sortable
                  headerStyle={{ width: "4rem" }}
                ></Column>
              );
            })}
          </DataTable>

          <h4>Passenger Info</h4>
          <DataTable
            value={ticketData[0].passenger_data}
            responsiveLayout="scroll"
            showGridlines
          >
            {PasengerColumns.map((ele) => {
              return (
                <Column
                  field={ele.field}
                  header={ele.header}
                  sortable
                  headerStyle={{ width: "4rem" }}
                ></Column>
              );
            })}
          </DataTable>
        </Dialog>
      </div>
    );
  };
  //!!!end ticket modal


  //shows button in tripSchedule expand row 
  const bpdpBodyTemplate = (data) => {
    return (
      <Button
        icon="pi pi-search"
        label="View Points"
        onClick={() => {
          setBoardingPointData(data.boarding_point);
          setDroppingPointData(data.dropping_point);
          setShowPointsDialog(true)
        }}
      />
    );
  };
  //end shows button in tripSchedule expand row 

  // shows button in tripSchedule expand row 
  const ticketBodyTemplate = (data) => {
    return <Button icon="pi pi-search" label="Views Tickets" onClick={() => {
      setTicketData(data.ticket); setShowTicketDialog(true)
    }} />;
  };
//end shows button in tripSchedule expand row 

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  //expand row template
  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Orders for {data.name}</h5>
        <DataTable
          value={data.tripSchedule}
          responsiveLayout="scroll"
          showGridlines
        >
          {TripScheduleColumns.map((ele) => {
            return (
              <Column
                field={ele.field}
                header={ele.header}
                body={
                  ele.field === "bpdp_point"
                    ? bpdpBodyTemplate
                    : ele.field === "tickets"
                    ? ticketBodyTemplate
                    : ""
                }
                sortable
                headerStyle={{ width: "4rem" }}
              ></Column>
            );
          })}
        </DataTable>
        {showBpDpTemplate()}
        {ticketTemplate()}
      </div>
    );
  };
    //end expand row template

  //   const header = (
  //       <div className="table-header-container">
  //           {/* <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} className="mr-2" />
  //           <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} /> */}
  //       </div>
  //   );

  return (
    <>
      <div className="grid">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-9" style={{ marginLeft: "-80px" }}>
          <div className="mt-6">
            <div className="datatable-rowexpansion-demo">
              <Toast ref={toast} />

              <div className="card">
                <DataTable
                  value={products}
                  expandedRows={expandedRows}
                  onRowToggle={(e) => setExpandedRows(e.data)}
                  onRowExpand={onRowExpand}
                  onRowCollapse={onRowCollapse}
                  responsiveLayout="scroll"
                  rowExpansionTemplate={rowExpansionTemplate}
                  dataKey="id"
                >
                  <Column expander style={{ width: "3em" }} />
                  {DashBoardColumns.map((ele) => {
                    return (
                      <Column
                        field={ele.field}
                        header={ele.header}
                        sortable
                        body={ele.header === "Image" ? imageBodyTemplate : ""}
                      />
                    );
                  })}
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
