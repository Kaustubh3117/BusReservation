import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ProductService } from '../service/ProductService';
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
// import { Rating } from 'primereact/rating';
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
// import './DataTableDemo.css';
import { backendUrl } from "../../../environment/development";

// import from helper
import { selectValues } from "./GridViewHelper";

export const GridView = (props) => {
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [select, setSelect] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setProducts(props.data);
  }, [props.data]);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        // toast.current.show({
        //   severity: "success",
        //   summary: "Successful",
        //   detail: "Product Updated",
        //   life: 3000,
        // });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        // toast.current.show({
        //   severity: "success",
        //   summary: "Successful",
        //   detail: "Product Created",
        //   life: 3000,
        // });
      }

      setProducts(_products);
      props.onFormSubmitHandler(_products)
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, "").split(",");
      data.shift();

      const importedData = data.map((d) => {
        d = d.split(",");
        const processedData = cols.reduce((obj, c, i) => {
          c =
            c === "Status"
              ? "inventoryStatus"
              : c === "Reviews"
              ? "rating"
              : c.toLowerCase();
          obj[c] = d[i].replace(/['"]+/g, "");
          (c === "price" || c === "rating") && (obj[c] = parseFloat(obj[c]));
          return obj;
        }, {});

        processedData["id"] = createId();
        return processedData;
      });

      const _products = [...products, ...importedData];

      setProducts(_products);
    };
    reader.readAsText(file, "UTF-8");
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  //delete multiple row
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    // let _products = products.filter(val => !selectedRowData.includes(val));
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const deletePayload = [];
    for (const i in selectedRowData) {
      console.log("i...", i);
      deletePayload.push(selectedRowData[i].id);
    }
    const finalPayload = { data: deletePayload };
    axios
      .post(`${backendUrl}/agent_api/delete_bus/`, finalPayload, config)
      .then(function (response) {
        setProduct(response.data);
        setDeleteProductsDialog(false);
        setSelectedRowData(null);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Bus Deleted",
          life: 3000,
        });
      });
  };
  //!!end delete multiple row

  //delete single row
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  //delete single row
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onSelectChange = (e) => {
    setSelect(e.value);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <Button label="Add" className="p-button-raised p-button-secondary mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedRowData || !selectedRowData.length} /> */}
        {/* <div className="flex align-items-center export-buttons">
            <Button type="button" icon="pi pi-plus" onClick={openNew} className="mr-2" data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-trash" onClick={confirmDeleteSelected} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-upload"  className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            <Button type="button" icon="pi pi-file-excel" onClick={exportCSV} className="p-button-info ml-auto" data-pr-tooltip="Selection Only" /> */}
        {/* </div> */}
        {header}
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-raised p-button-secondary mr-2" onClick={exportCSV} /> */}
        <div className="flex align-items-center export-buttons">
          <Button
            type="button"
            icon="pi pi-plus"
            onClick={openNew}
            className="mr-2"
            data-pr-tooltip="CSV"
          />
          <Button
            type="button"
            icon="pi pi-trash"
            onClick={confirmDeleteSelected}
            className="p-button-success mr-2"
            data-pr-tooltip="XLS"
          />
          <Button
            type="button"
            icon="pi pi-upload"
            className="p-button-warning mr-2"
            data-pr-tooltip="PDF"
          />
          <Button
            type="button"
            icon="pi pi-file-excel"
            onClick={exportCSV}
            className="p-button-info ml-auto"
            data-pr-tooltip="Selection Only"
          />
        </div>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">{props.title}</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  //movve logic to helper while converting response as well as for payload
  const convertResponseTime = (time) => {
    const d = new Date();
    if (time !== null && time !== undefined) {
      const myArray = time.split(" ");
      const t = myArray[0];
      const newArr = t.split(":");
      d.setHours(newArr[0], newArr[1], 0);
      return d;
    }
    console.log("time", time);
  };

  //make it dynamic should work for all select options
  const getSelectValue = (value) => {
    //{select === null ? getSelectValue(product[fields['name']]) :
    selectValues.forEach((obj) => {
      if (value === obj.value) {
        setSelect(obj.value);
      }
    });
  };

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className=""
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
          style={{ width: "100%", borderRadius: "0px" }}
        ></Toolbar>

        <DataTable
          ref={dt}
          style={{ width: "100%" }}
          value={props.data}
          selection={selectedRowData}
          onSelectionChange={(e) => setSelectedRowData(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          // header={header}
          showGridlines
          stripedRows
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          {props.columns.map((ele) => {
            return (
              <Column
                field={ele.field}
                header={ele.header}
                body={ele.body}
                sortable={ele.sortable}
                style={{ minWidth: "12rem" }}
              ></Column>
            );
          })}
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
      {/* edit and add dialog */}

      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header={props.title}
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.image && (
          <img
            src={`images/product/${product.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.image}
            className="product-image block m-auto pb-3"
          />
        )}
        {/* <h1>Bus Name for which tripschedule created</h1> */}
        {!!props.formFields &&
        Array.isArray(props.formFields) &&
        props.formFields.length > 0
          ? props.formFields.map((fields) => {
              return (
                <>
                  {fields.fieldType === "text" ? (
                    <div className="field">
                      <label htmlFor="name">{fields.label}</label>
                      <InputText
                        id={fields.id}
                        name={fields.name}
                        value={product[fields["name"]]}
                        onChange={(e) => onInputChange(e, "name")}
                        required
                        autoFocus
                        className={classNames({
                          "p-invalid": submitted && !product.name,
                        })}
                      />
                      {submitted && !product.name && (
                        <small className="p-error">{fields.errorMessage}</small>
                      )}
                    </div>
                  ) : null}
                  {fields.fieldType === "time" ? (
                    <div className="field">
                      <label htmlFor="name">{fields.label}</label>
                      <Calendar
                        id={fields.id}
                        name={fields.name}
                        value={
                          time === null
                            ? convertResponseTime(product[fields["name"]])
                            : time
                        }
                        onChange={(e) => setTime(e.value)}
                        timeOnly
                        hourFormat="12"
                      />
                      {submitted && !product.name && (
                        <small className="p-error">{fields.errorMessage}</small>
                      )}
                    </div>
                  ) : null}
                  {fields.fieldType === "date" ? (
                    <div className="field">
                      <label htmlFor="name">{fields.label}</label>
                      <Calendar
                        id={fields.id}
                        name={fields.name}
                        dateFormat="dd/mm/yy"
                        value={new Date(date ? date : product[fields["name"]])}
                        onChange={(e) => setDate(e.value)}
                      ></Calendar>
                      {submitted && !product.name && (
                        <small className="p-error">{fields.errorMessage}</small>
                      )}
                    </div>
                  ) : null}
                  {fields.fieldType === "number" ? (
                    <div className="field">
                      <label htmlFor="name">{fields.label}</label>
                      <InputNumber
                        id={fields.id}
                        name={fields.name}
                        value={product[fields["name"]]}
                        onValueChange={(e) =>
                          onInputNumberChange(e, "quantity")
                        }
                        integeronly
                      />
                      {submitted && !product.name && (
                        <small className="p-error">{fields.errorMessage}</small>
                      )}
                    </div>
                  ) : null}
                  {fields.fieldType === "select" ? (
                    <div className="field">
                      <label htmlFor="name">{fields.label}</label>
                      <Dropdown
                        id={fields.id}
                        name={fields.name}
                        value={
                          select === null
                            ? getSelectValue(product[fields["name"]])
                            : select
                        }
                        options={selectValues}
                        onChange={onSelectChange}
                        optionLabel="name"
                        placeholder="Select"
                      />
                      {submitted && !product.name && (
                        <small className="p-error">{fields.errorMessage}</small>
                      )}
                    </div>
                  ) : null}
                </>
              );
            })
          : null}
      </Dialog>

      {/* delete dialog */}
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      {/* delete dialog */}
      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
