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
import { connect } from "react-redux";
import axios from "axios";
import Select from "react-select";
import "./Style.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";
import ProfileImage from "./Modals/ProfileImage";
import ProductImages from "./Modals/ProductImages";
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
    .min(todayMinusOne, "Past dates cannot be selected."),
  isActive: yup.boolean("Mention Active State"),
  color: yup.string("Enter Color"),
  itemsold: yup.number("Enter Item Sold in (numbers)"),
  material: yup.string("Enter Material"),
  productCode: yup.string(),
  id: yup.number(),
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CreateProduct(props) {
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [categoriesMaster, setCategoriesMaster] = useState([]);
  const [parsedImages, setParsedImages] = useState({ all: [], profile: [] });

  useEffect(() => {
    const getCategories = () => {
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
    };
    getCategories();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setCategories(
        Categories.map(({ id, name }) => ({
          value: name,
          label: name,
          id,
        }))
      );
      setProductId(id);
      getImages(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (values.id === "") {
        createProduct({
          ...values,
          keepinstocktill:
            values.keepinstocktill === "" ? null : values.keepinstocktill,
        });
      } else {
        updateProducts({
          ...values,
          keepinstocktill:
            values.keepinstocktill === "" ? null : values.keepinstocktill,
        });
      }
    },
  });

  const createProduct = async (values) => {
    await axios
      .post("/product/create", values)
      .then((res) => {
        if (res.data.status === 0) {
          props.errorToast(res.data.message);
        }
        if (res.data.status === 1) {
          props.successToast(res.data.message);
          // setCategories({ ...categories, productId: res.data.data.id });
          setProductId(res.data.data.id);
          getImages(res.data.data.id);
          setTabValue(1);
        }
      })
      .catch((e) => {
        props.errorToast("Some issue while creating the product.");
        console.log(e);
      });
  };

  const getImages = async (id) => {
    await axios
      .get(`/product/images/${id}`)
      .then((res) => {
        setParsedImages(res.data);
      })
      .catch((e) => console.log(e));
  };

  const updateProducts = async (values) => {
    await axios
      .put("/product/update", values)
      .then((res) => {
        if (res.data.status === 0) {
          props.errorToast(res.data.message);
        }
        if (res.data.status === 1) {
          props.successToast(res.data.message);
          setTabValue(1);
        }
      })
      .catch((e) => {
        props.errorToast("Some issue while updating the product.");
        console.log(e);
      });
  };

  const handleCategoriesChange = (e, actionType) => {
    setCategories(e);
    if (actionType.action === "select-option") {
      createCategories({
        ProductId: productId,
        CategoryId: actionType.option.id,
      });
    }
    if (
      actionType.action === "remove-value" ||
      actionType.action === "pop-value"
    ) {
      deleteCategories({
        ProductId: productId,
        CategoryId: actionType.removedValue.id,
      });
    }
  };

  const createCategories = async (data) => {
    await axios
      .post("/product/createProCat", data)
      .then((res) => {
        if (res.data.status === 1) {
          props.successToast(res.data.message);
        } else {
          props.errorToast(res.data.message);
        }
      })
      .catch((e) => {
        props.errorToast("Some issue while adding category to this product.");
        console.log(e);
      });
  };

  const deleteCategories = async (data) => {
    await axios
      .post("/product/deleteProCat", data)
      .then((res) => {
        if (res.data.status === 1) {
          props.successToast(res.data.message);
        } else {
          props.errorToast(res.data.message);
        }
      })
      .catch((e) => {
        props.errorToast("Some issue while adding category to this product.");
        console.log(e);
      });
  };
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = async (event, newValue) => {
    formik.setFieldTouched("name");
    formik.setFieldTouched("actualprice");
    formik.setFieldTouched("totalstocks");
    const data = await formik.validateForm();
    if (Object.keys(data).length !== 0) {
      props.errorToast("Please remove all the errors first!");
    } else if (productId === null) {
      props.errorToast("Please save the product first");
    } else {
      setTabValue(newValue);
    }
  };

  /**
   * Handling Images
   */

  /**
   * Creating Image Box
   */

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Product Details" {...a11yProps(0)} />
            <Tab label="Images & Categories" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
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
                      formik.touched.offerprice &&
                      Boolean(formik.errors.offerprice)
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
                    helperText={
                      formik.touched.material && formik.errors.material
                    }
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
                {formik.values.id !== "" && (
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
                        formik.touched.itemsold &&
                        Boolean(formik.errors.itemsold)
                      }
                      helperText={
                        formik.touched.itemsold && formik.errors.itemsold
                      }
                    />
                  </Grid>
                )}
                {formik.values.id !== "" && (
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
                      disabled={true}
                    />
                  </Grid>
                )}
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
                  <div className="error" style={{ color: "#0e406a" }}>
                    <ErrorIcon style={{ paddingTop: "5px" }} />
                    <span>
                      Keep the field empty to keep product in stock forever.
                    </span>
                  </div>
                  {formik.touched.keepinstocktill &&
                    Boolean(formik.errors.keepinstocktill) && (
                      <div className="error">
                        {formik.errors.keepinstocktill}
                      </div>
                    )}
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
                Save
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <div className="image_categories">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Select
                  options={categoriesMaster}
                  value={categories}
                  isMulti={true}
                  isSearchable={true}
                  onChange={handleCategoriesChange}
                  isClearable={false}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <ProfileImage
                  {...props}
                  productId={productId}
                  imageData={parsedImages.profile}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <ProductImages
                  {...props}
                  productId={productId}
                  imageData={parsedImages.all}
                />
              </Grid>
            </Grid>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
export default connect(null, {
  successToast,
  errorToast,
})(CreateProduct);
