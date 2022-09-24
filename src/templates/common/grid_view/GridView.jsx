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
import { SetInitialValues } from "./GridViewHelper";

export const GridView = (props) => {
  const initialValues = SetInitialValues(props.formFields);
  let emptyProduct = initialValues;
  const [date, setDate] = useState(new Date());
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
    setSubmitted(false);
  }, [props.data]);

  const openNew = () => {
    if(select !== null){
setSelect(null)
    }
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
    // let _product = { ...product };
    if (product.id) {
      props.onFormSubmitHandler(product, product.id);
    } else {
      props.onFormSubmitHandler(product, null);
    }
    setProductDialog(false);
  };

  const editProduct = (product) => {
    if (select !== null) {
      setSelect(null);
    }
    setSubmitted(false);
    setProduct({ ...product });
    setProductDialog(true);
  };

  //delete multiple row
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const deleteSelectedProducts = () => {
    props.onDeleteClickHandler(selectedRowData);
  };
  //!!end delete multiple row

  //delete single row
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    props.onDeleteClickHandler(product);
    setDeleteProductDialog(false);
  };
  // end delete single row
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

        // processedData["id"] = createId();
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
  const handleImageChange = (e, name) => {
    const val = e.target.files[0] || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onSelectChange = (e, name) => {
    let _product = { ...product };
    _product[`${name}`] = e.value;
    setProduct(_product);
    setSelect(e.value);
  };

  const onTimeChange = (e, name) => {
    let _product = { ...product };
    _product[`${name}`] = e.value;
    setProduct(_product);
    setTime(e.value);
  };

  const onDateChange = (e, name) => {
    let _product = { ...product };
    _product[`${name}`] = e.value;
    setProduct(_product);
    setDate(null);
  };

  const leftToolbarTemplate = () => {
    return <React.Fragment>{header}</React.Fragment>;
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
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
            disabled={selectedRowData ? false : true}
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
          className="p-button-rounded p-button-success mr-2 p-button-sm"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-button-sm"
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
  const getSelectValue = (dropDownVals, value) => {
    //{select === null ? getSelectValue(product[fields['name']]) :
    dropDownVals.forEach((obj) => {
      if (value === obj.value) {
        setSelect(obj.value);
      }
    });
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData;
    return (
      <React.Fragment>
        <img
          alt={representative.name}
          src={representative.image}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={80}
          style={{ verticalAlign: "middle" }}
        />
      </React.Fragment>
    );
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
                body={
                  ele.header === "Image" ? representativeBodyTemplate : ele.body
                }
                sortable={ele.sortable}
                style={{ maxWidth: "12rem" }}
                className="white-space-nowrap overflow-hidden text-overflow-ellipsis"
              ></Column>
            );
          })}
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "9rem" }}
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
            src={product.image}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.image}
            className="product-image block m-auto pb-3"
            width="150px"
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
                        onChange={(e) => onInputChange(e, fields.name)}
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
                  {fields.fieldType === "fileupload" ? (
                    <>
                      <input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => handleImageChange(e, fields.name)}
                        required
                      />
                    </>
                  ) : null}
                  {fields.fieldType === "time" ? (
                    <div className="field">
                      <label htmlFor="name">{fields.label}</label>
                      <Calendar
                        id={fields.id}
                        name={fields.name}
                        value={
                          typeof product[fields["name"]] === "string"
                            ? convertResponseTime(product[fields["name"]])
                            : product[fields["name"]]
                        }
                        onChange={(e) => onTimeChange(e, fields.name)}
                        timeOnly
                        hourFormat="12"
                        placeholder="00:00"
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
                        value={
                          new Date(
                            date === null ? product[fields["name"]] : date
                          )
                        }
                        onChange={(e) => onDateChange(e, fields.name)}
                      ></Calendar>
                      {submitted && product.name === null && product.name === '' && product.name === undefined && (
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
                          onInputNumberChange(e, fields.name)
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
                            ? getSelectValue(
                                fields.dropDownValues,
                                product[fields["name"]]
                              )
                            : select
                        }
                        options={fields.dropDownValues}
                        onChange={(e) => {
                          onSelectChange(e, fields.name);
                        }}
                        optionLabel="name"
                        placeholder="Select"
                      />
                      {submitted && product.name === null && product.name === '' && product.name === undefined  && (
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
