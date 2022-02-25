import React, { useState, useEffect } from "react";
import { Button, TextField, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { AgGridReact } from "ag-grid-react";
import { AppConstant } from "../../../Authentication/Constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ActionRenderer from "./Ag_Grid_Utils/ActionRenderer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const validationSchema = yup.object({
  name: yup.string("Enter Name").required("Name is required"),
  description: yup
    .string("Enter Description")
    .max(254, "Cannot exceed more than 254 characters."),
});

function Category() {
  const [rowData, setrowData] = useState(undefined);
  useEffect(() => {
    axios
      .get("/product/category")
      .then((res) => {
        setrowData(res.data.data);
        if (res.data.status === 0) {
          toast.error(res.data.message, {
            duration: 6000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Issues while Fetching category.", {
          duration: 6000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [gridApi, setGridApi] = useState(null);
  const [open, setOpen] = React.useState(false);

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Actions",
      width: fullScreen ? 120 : 70,
      pinned: "right",
      cellRenderer: ActionRenderer,
      resizable: false,
      sortable: false,
      filter: false,
      // lockPosition: true,
      suppressMovable: true,
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await axios
        .post("/product/category", values)
        .then((res) => {
          if (res.data.status === 0) {
            toast.error(res.data.message, {
              duration: 6000,
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          }
          if (res.data.status === 1) {
            toast.success(res.data.message, {
              duration: 6000,
              style: {
                borderRadius: "10px",
              },
            });
            gridApi?.applyTransaction({ add: [res.data.data] });
            formik.resetForm();
            handleClose();
          }
        })
        .catch((e) => {
          toast.error("Issues while Creating category.", {
            duration: 6000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          console.log(e);
        });
    },
  });
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    filterParams: {
      buttons: ["reset"],
      debounceMs: 200,
    },
  };
  const onGridReady = (e) => {
    e.api.sizeColumnsToFit();
    setGridApi(e.api);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <h2 style={{ marginRight: "20px", flex: "1" }}>Category</h2>
        <div className="hor createCategory">
          <Button variant="contained" onClick={() => handleClickOpen()}>
            <AddIcon /> {"  "} Create Category
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
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle id="responsive-dialog-title">
              Create Category
            </DialogTitle>
            <DialogContent>
              <div style={{ marginTop: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      autoFocus={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="description"
                      name="description"
                      label="Description"
                      type="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      multiline
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default Category;
