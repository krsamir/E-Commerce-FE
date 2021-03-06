import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "../Style.css";
import axios from "axios";
import {
  successToast,
  errorToast,
} from "../../../../Redux/Actions/ToastActions";
import { connect } from "react-redux";
const validationSchema = yup.object({
  id: yup.number(),
  name: yup.string("Enter Name").required("Name is required"),
  description: yup
    .string("Enter Description")
    .max(254, "Cannot exceed more than 254 characters."),
});

function ActionRenderer(props) {
  const formik = useFormik({
    initialValues: {
      id: null,
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await axios
        .put("/product/category", values)
        .then((res) => {
          if (res.data.status === 0) {
            props.errorToast(res.data.message);
          }
          if (res.data.status === 1) {
            props.successToast(res.data.message);
            props?.api?.applyTransaction({ update: [values] });
            formik.resetForm();
            handleClose();
          }
        })
        .catch((e) => {
          props.errorToast("Issues while editing category.");
          console.log(e);
        });
    },
  });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteId, setDeleteId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (data) => {
    setOpenDelete(true);
    setDeleteId(data);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDelete = async () => {
    if (deleteId) {
      await axios
        .delete("/product/category", {
          data: {
            id: deleteId,
          },
        })
        .then((res) => {
          if (res.data.status === 0) {
            props.errorToast(res.data.message);
          }
          if (res.data.status === 1) {
            props.successToast(res.data.message);
            props?.api.applyTransaction({ remove: [{ id: deleteId }] });
            handleCloseDelete();
            setDeleteId(null);
          }
        })
        .catch((e) => {
          props.errorToast("Issues while deleting category.");
          console.log(e);
        });
    } else {
      props.errorToast("Issues while deleting category.");
    }
  };

  const handleEdit = (data) => {
    handleClickOpen();
    formik.setFieldValue("id", props.data.id);
    formik.setFieldValue("name", props.data.name);
    formik.setFieldValue("description", props.data.description);
  };
  return (
    <div>
      <div className="icon hor pointer">
        <EditIcon onClick={() => handleEdit(props.data)} />
        <DeleteIcon onClick={() => handleClickOpenDelete(props.data.id)} />
        {/* Edit Dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle id="responsive-dialog-title">
              Edit Category
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
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You sure you want to delete this category ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default connect(null, { successToast, errorToast })(ActionRenderer);
