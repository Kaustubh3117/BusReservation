import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SideBar } from "./assets/SideBar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export const AgentView = () => {
  const isAgent = useSelector((state) => state?.auth?.user?.is_agent);
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAgent === undefined || !isAgent) {
      navigate("/login");
    }
  }, [isAgent]);

  useEffect(() => {
    if (isMounted.current) {
      const summary =
        expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
      toast.current.show({
        severity: "success",
        summary: `${summary}`,
        life: 3000,
      });
    }
  }, [expandedRows]);

  useEffect(() => {
    isMounted.current = true;
    setProducts(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  //   const expandAll = () => {
  //       let _expandedRows = {};
  //       products.forEach(p => _expandedRows[`${p.id}`] = true);

  //       setExpandedRows(_expandedRows);
  //   }

  //   const collapseAll = () => {
  //       setExpandedRows(null);
  //   }

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amount);
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <>
        <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
          {rowData.status}
        </span>
      </>
    );
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

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

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Orders for {data.name}</h5>
        <DataTable value={data.orders} responsiveLayout="scroll">
          <Column field="id" header="Id" sortable></Column>
          <Column field="customer" header="Customer" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column
            field="amount"
            header="Amount"
            body={amountBodyTemplate}
            sortable
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusOrderBodyTemplate}
            sortable
          ></Column>
          <Column
            headerStyle={{ width: "4rem" }}
            body={searchBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  //   const header = (
  //       <div className="table-header-container">
  //           {/* <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} className="mr-2" />
  //           <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} /> */}
  //       </div>
  //   );

  const data = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      orders: [
        {
          id: "1000",
          productCode: "f230fh0g3",
          date: "2020-09-13",
          amount: 65,
          quantity: 1,
          customer: "David James",
          status: "PENDING",
        },
        {
          id: "1001",
          productCode: "f230fh0g3",
          date: "2020-05-14",
          amount: 130,
          quantity: 2,
          customer: "Leon Rodrigues",
          status: "DELIVERED",
        },
        {
          id: "1002",
          productCode: "f230fh0g3",
          date: "2019-01-04",
          amount: 65,
          quantity: 1,
          customer: "Juan Alejandro",
          status: "RETURNED",
        },
        {
          id: "1003",
          productCode: "f230fh0g3",
          date: "2020-09-13",
          amount: 195,
          quantity: 3,
          customer: "Claire Morrow",
          status: "CANCELLED",
        },
      ],
    },
  ];

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
                  value={data}
                  expandedRows={expandedRows}
                  onRowToggle={(e) => setExpandedRows(e.data)}
                  onRowExpand={onRowExpand}
                  onRowCollapse={onRowCollapse}
                  responsiveLayout="scroll"
                  rowExpansionTemplate={rowExpansionTemplate}
                  dataKey="id"
                >
                  <Column expander style={{ width: "3em" }} />
                  <Column field="name" header="Name" sortable />
                  <Column header="Image" body={imageBodyTemplate} />
                  <Column
                    field="price"
                    header="Price"
                    sortable
                    body={priceBodyTemplate}
                  />
                  <Column field="category" header="Category" sortable />
                  <Column
                    field="rating"
                    header="Reviews"
                    sortable
                    body={ratingBodyTemplate}
                  />
                  <Column
                    field="inventoryStatus"
                    header="Status"
                    sortable
                    body={statusBodyTemplate}
                  />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
