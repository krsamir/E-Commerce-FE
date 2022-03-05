import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Style.css";
import { AgGridReact } from "ag-grid-react";
import { AppConstant } from "../../../Authentication/Constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../../../Redux/Actions/ToastActions";
import { connect } from "react-redux";
function Products(props) {
  const [rowData, setrowData] = useState(undefined);
  useEffect(() => {
    axios
      .get("/product/admin/getAllProduct")
      .then((res) => {
        setrowData(res.data.data);
        if (res.data.status === 0) {
          props.errorToast(res.data.message);
        }
      })
      .catch((e) => {
        props.errorToast("Issues while Fetching Product.");
        console.log(e);
      });
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [gridApi, setGridApi] = useState(null);

  const actionCellRenderer = (params) => {
    return (
      <div>
        <EditIcon
          className="pointer"
          onClick={() => {
            props.history.push({
              pathname: "/admin/home/products/edit",
              state: params.data,
            });
          }}
        />
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Name", field: "name", width: 250 },
    { headerName: "Total Stocks", field: "totalstocks", width: 120 },
    { headerName: "Offer Price", field: "offerprice", width: 120 },
    { headerName: "Actual Price", field: "actualprice", width: 150 },
    { headerName: "Keep in stock till", field: "keepinstocktill" },
    {
      headerName: "Is Active",
      field: "isActive",
      width: 100,
      valueGetter: (params) => (params.data.isActive === true ? "Yes" : "No"),
    },
    { headerName: "Color", field: "color" },
    { headerName: "Items Sold", field: "itemsold", width: 150 },
    {
      headerName: "Categories",
      field: "Categories",
      width: 250,
      valueGetter: (params) => {
        return params.data.Categories.map(({ name }) => name);
      },
    },
    { headerName: "Material", field: "material", width: 150 },
    { headerName: "Product Code", field: "productCode" },
    { headerName: "Description", field: "description" },
    { headerName: "ID", field: "id", width: 150 },
    {
      headerName: "Created At",
      field: "createdAt",
      valueGetter: (params) => new Date(params.data.createdAt).toLocaleString(),
    },
    { headerName: "Created By", field: "createdby" },
    {
      headerName: "Actions",
      width: fullScreen ? 120 : 70,
      pinned: "right",
      //   cellRenderer: ProductCellRenderer,
      cellRenderer: actionCellRenderer,
      resizable: false,
      sortable: false,
      filter: false,
      // lockPosition: true,
      suppressMovable: true,
    },
  ];
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    width: 200,
    filterParams: {
      buttons: ["reset"],
      debounceMs: 200,
    },
  };
  const onGridReady = (e) => {
    setGridApi(e.api);
  };
  const handleCreateProduct = () => {
    props.history.push("/admin/home/products/new");
    console.log("Redirect to new page");
  };

  const gridOptions = {
    pagination: true,
    // frameworkComponents: { customTooltip: ErrorTooltip },
    overlayNoRowsTemplate: "<h3>No Data Available.</h3>",
    tooltipShowDelay: 0,
  };

  const getRowNodeId = (data) => data.id;
  return (
    <div>
      <Toaster />
      <div className="hor">
        <h2 style={{ marginRight: "20px", flex: "1" }}>Products</h2>
        <div className="hor createCategory">
          <Button variant="contained" onClick={() => handleCreateProduct()}>
            <AddIcon /> {"  "} Create Product
          </Button>

          <TextField
            variant="outlined"
            id="search"
            name="Search"
            label="Search"
            onChange={(e) => gridApi?.setQuickFilter(e.target.value)}
            autoFocus={true}
            style={{ marginLeft: "20px" }}
            size="small"
          />
        </div>
      </div>
      <div>
        <div
          className={AppConstant.Theme}
          style={{ height: 400, width: "100%", marginBottom: "20px" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows={true}
            gridOptions={gridOptions}
            getRowNodeId={getRowNodeId}
            paginationPageSize={10}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { successToast, errorToast })(Products);
