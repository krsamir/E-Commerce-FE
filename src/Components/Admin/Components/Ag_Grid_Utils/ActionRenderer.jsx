import React from "react";
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
// import toast, { Toaster } from "react-hot-toast";

const validationSchema = yup.object({
  name: yup.string("Enter Name").required("Name is required"),
  description: yup
    .string("Enter Description")
    .max(254, "Cannot exceed more than 254 characters."),
});

function ActionRenderer(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.api?.applyTransaction({ add: [values] });
      formik.resetForm();
      console.log(values);
      handleClose();
    },
  });
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDelete = () => {
    setOpenDelete(false);
  };

  const handleEdit = () => {
    handleClickOpen();
    formik.setFieldValue("name", props.data.name);
    formik.setFieldValue("description", props.data.description);
  };
  return (
    <div>
      <div className="icon hor pointer">
        <EditIcon onClick={() => handleEdit()} />
        <DeleteIcon onClick={() => handleClickOpenDelete()} />
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

export default ActionRenderer;
