import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { successToast, errorToast } from "../../../Redux/Actions/ToastActions";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import axios from "axios";
import Select from "react-select";
import "./Style.css";

const date = new Date();
const todayMinusOne = new Date(date.setDate(date.getDate() - 1)).toISOString();
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
  keepinstocktill: yup
    .date()
    .min(todayMinusOne, "Past dates cannot be selected.")
    .required("This is a madatory field."),
  isActive: yup.boolean("Mention Active State"),
  color: yup.string("Enter Color"),
  itemsold: yup.number("Enter Item Sold in (numbers)"),
  material: yup.string("Enter Material"),
  productCode: yup.string(),
  id: yup.number(),
});

function CreateProduct(props) {
  const [categories, setCategories] = useState({
    productId: null,
    category: [],
  });
  const Input = styled("input")({
    display: "none",
  });
  const [categoriesMaster, setCategoriesMaster] = useState([]);
  useEffect(() => {
    axios
      .get("/product/category")
      .then((res) => {
        setCategoriesMaster(
          res.data.data.map(({ id, name }) => ({
            value: name,
            label: name,
            id,
          }))
        );
        if (res.data.status === 0) {
          props.errorToast(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Issues while Fetching category.");
      });
  }, []);

  useEffect(() => {
    if (props.location.state) {
      const {
        Categories,
        // Images,
        actualprice,
        color,
        description,
        id,
        isActive,
        itemsold,
        keepinstocktill,
        material,
        name,
        offerprice,
        productCode,
        totalstocks,
      } = props.location.state;
      formik.setFieldValue("name", name, true);
      formik.setFieldValue("actualprice", actualprice, true);
      formik.setFieldValue("color", color, true);
      formik.setFieldValue("description", description, true);
      formik.setFieldValue("id", id, true);
      formik.setFieldValue("isActive", isActive, true);
      formik.setFieldValue("itemsold", itemsold, true);
      formik.setFieldValue("keepinstocktill", keepinstocktill ?? "", true);
      formik.setFieldValue("material", material, true);
      formik.setFieldValue("offerprice", offerprice, true);
      formik.setFieldValue("productCode", productCode, true);
      formik.setFieldValue("totalstocks", totalstocks, true);
      formik.setFieldValue("name", name, true);
      setCategories({
        productId: id,
        category: Categories.map(({ id, name }) => ({
          value: name,
          label: name,
          id,
        })),
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      totalstocks: "",
      offerprice: "",
      actualprice: "",
      isActive: true,
      keepinstocktill: "",
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
      console.log(categories);
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

  const handleCategoriesChange = (e) => {
    console.log(e);
    setCategories({ ...categories, category: e });
  };

  return (
    <div>
      <h3>Create/ Update Products</h3>
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <label htmlFor="keepinstocktill" className="detepickerLabel">
                Keep In Stock Till
              </label>
              <br />
              <input
                type="date"
                name="keepinstocktill"
                id="keepinstocktill"
                value={formik.values.keepinstocktill}
                onChange={formik.handleChange}
                className="datepickers"
                min={new Date().toISOString().split("T")[0]}
              />
              {formik.touched.keepinstocktill &&
                Boolean(formik.errors.keepinstocktill) && (
                  <div className="error">{formik.errors.keepinstocktill}</div>
                )}
              {/* <TextField
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
              /> */}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="name"
                      name="isActive"
                      checked={formik.values.isActive}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Is Active"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </div>
        <div className="image_categories">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(e) => console.log(e.target.files)}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                options={categoriesMaster}
                value={categories.category}
                isMulti={true}
                isSearchable={true}
                onChange={handleCategoriesChange}
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
          <Button
            variant="contained"
            onClick={() =>
              props.history.push({
                pathname: "/admin/home/products",
                state: "",
              })
            }
          >
            Cancel
          </Button>
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
