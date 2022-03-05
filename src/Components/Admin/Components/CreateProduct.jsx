import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Grid } from "@mui/material";
import { successToast, errorToast } from "../../../Redux/Actions/ToastActions";
import { connect } from "react-redux";
import { Toaster } from "react-hot-toast";
const validationSchema = yup.object({
  name: yup.string("Enter Name").required("Name is required"),
  description: yup.string("Enter Description"),
  totalstocks: yup
    .number("Enter Total Stocks in (numbers)")
    .required("No of total stocks is madatory field"),
  offerprice: yup.number("Enter Offer Price in (numbers)"),
  actualprice: yup
    .number("Enter Actual Price in (numbers)")
    .required("Actual Price is a madatory field."),
  keepinstocktill: yup.date().required("This is a madatory field."),
  isActive: yup.number("Mention Active State"),
  color: yup.string("Enter Color"),
  itemsold: yup.number("Enter Item Sold in (numbers)"),
  Categories: yup.string("Enter Categories"),
  material: yup.string("Enter Material"),
  productCode: yup.string(),
  id: yup.number(),
});

function CreateProduct(props) {
  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state);
    }
  }, [props]);

  const formik = useFormik({
    initialValues: {
      name: "",
      totalstocks: "",
      offerprice: "",
      actualprice: "",
      isActive: "",
      keepinstocktill: "",
      Categories: "",
      material: "",
      color: "",
      description: "",
      itemsold: "",
      productCode: "",
      id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      props.successToast("Testing toast");
      //   await axios
      //     .post("/product/category", values)
      //     .then((res) => {
      //       if (res.data.status === 0) {
      //         toast.error(res.data.message, {
      //           duration: 6000,
      //           style: {
      //             borderRadius: "10px",
      //             background: "#333",
      //             color: "#fff",
      //           },
      //         });
      //       }
      //       if (res.data.status === 1) {
      //         toast.success(res.data.message, {
      //           duration: 6000,
      //           style: {
      //             borderRadius: "10px",
      //           },
      //         });
      //         gridApi?.applyTransaction({ add: [res.data.data] });
      //         formik.resetForm();
      //         handleClose();
      //       }
      //     })
      //     .catch((e) => {
      //       toast.error("Issues while Creating category.", {
      //         duration: 6000,
      //         style: {
      //           borderRadius: "10px",
      //           background: "#333",
      //           color: "#fff",
      //         },
      //       });
      //       console.log(e);
      //     });
    },
  });

  return (
    <div>
      <Toaster />
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="totalstocks"
                name="totalstocks"
                label="Total Stocks"
                value={formik.values.totalstocks}
                onChange={formik.handleChange}
                error={
                  formik.touched.totalstocks &&
                  Boolean(formik.errors.totalstocks)
                }
                helperText={
                  formik.touched.totalstocks && formik.errors.totalstocks
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="offerprice"
                name="offerprice"
                label="Offer Price"
                value={formik.values.offerprice}
                onChange={formik.handleChange}
                error={
                  formik.touched.offerprice && Boolean(formik.errors.offerprice)
                }
                helperText={
                  formik.touched.offerprice && formik.errors.offerprice
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="actualprice"
                name="actualprice"
                label="Actual Price"
                value={formik.values.actualprice}
                onChange={formik.handleChange}
                error={
                  formik.touched.actualprice &&
                  Boolean(formik.errors.actualprice)
                }
                helperText={
                  formik.touched.actualprice && formik.errors.actualprice
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="keepinstocktill"
                name="keepinstocktill"
                label="Keep In Stock Till"
                value={formik.values.keepinstocktill}
                onChange={formik.handleChange}
                error={
                  formik.touched.keepinstocktill &&
                  Boolean(formik.errors.keepinstocktill)
                }
                helperText={
                  formik.touched.keepinstocktill &&
                  formik.errors.keepinstocktill
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="Categories"
                name="Categories"
                label="Categories"
                value={formik.values.Categories}
                onChange={formik.handleChange}
                error={
                  formik.touched.Categories && Boolean(formik.errors.Categories)
                }
                helperText={
                  formik.touched.Categories && formik.errors.Categories
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="material"
                name="material"
                label="Material"
                value={formik.values.material}
                onChange={formik.handleChange}
                error={
                  formik.touched.material && Boolean(formik.errors.material)
                }
                helperText={formik.touched.material && formik.errors.material}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="color"
                name="color"
                label="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="itemsold"
                name="itemsold"
                label="Item Sold"
                value={formik.values.itemsold}
                onChange={formik.handleChange}
                error={
                  formik.touched.itemsold && Boolean(formik.errors.itemsold)
                }
                helperText={formik.touched.itemsold && formik.errors.itemsold}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="productCode"
                name="productCode"
                label="Product Code"
                value={formik.values.productCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.productCode &&
                  Boolean(formik.errors.productCode)
                }
                helperText={
                  formik.touched.productCode && formik.errors.productCode
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                variant="outlined"
                id="name"
                name="isActive"
                label="Is Active"
                value={formik.values.isActive}
                onChange={formik.handleChange}
                error={
                  formik.touched.isActive && Boolean(formik.errors.isActive)
                }
                helperText={formik.touched.isActive && formik.errors.isActive}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained">Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            style={{ marginLeft: "20px" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default connect(null, {
  successToast,
  errorToast,
})(CreateProduct);