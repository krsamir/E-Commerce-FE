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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { successToast, errorToast } from "../../../Redux/Actions/ToastActions";
import { styled } from "@mui/material/styles";
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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [categories, setCategories] = useState({
    productId: null,
    category: [],
  });
  const Input = styled("input")({
    display: "none",
  });
  const [categoriesMaster, setCategoriesMaster] = useState([]);
  const [images, setImages] = useState([]);

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
    // getCategories()
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      images.map((value) => URL.revokeObjectURL(value));
    };
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
      console.log({
        ...values,
        keepinstocktill:
          values.keepinstocktill === "" ? null : values.keepinstocktill,
      });
      console.log(categories);
      setTabValue(1);
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
  const [tabValue, setTabValue] = React.useState(1);

  const handleChangeTab = (event, newValue) => {
    console.log(newValue);
    setTabValue(newValue);
  };

  /**
   * Handling Images
   */
  const handleUploadImages = (e) => {
    const values = [...images];
    setImages(values.concat(Array.from(e.target.files)));
  };
  const handleSaveImages = () => {
    props.successToast("Uploading Images", 2000);
    console.log(images);
    const formData = new FormData();
    images.map((_, i) => formData.append("images[]", images[i]));
    console.log(formData);
    // const file = [];
    // for (let i = 0; i < images.length; i++) {
    //   file[i] = new File(
    //     [images[i]],
    //     `${data.postId}+${Date.now()}+${images[i].name}`
    //   );
    // }
  };
  const ImageUrl = images.map((image) => URL.createObjectURL(image));
  const removeData = (i) => {
    const value = [...images];
    value.splice(i, 1);
    setImages(value);
  };

  /**
   * Creating Image Box
   */

  const [counter, setCounter] = useState(0);

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
            <Tab label="Categories" {...a11yProps(2)} />
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
                    helperText={
                      formik.touched.itemsold && formik.errors.itemsold
                    }
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
                  <div className="error" style={{ color: "#43b049" }}>
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
                  value={categories.category}
                  isMulti={true}
                  isSearchable={true}
                  onChange={handleCategoriesChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="contained-button-file">
                  <Input
                    name="myFile[]"
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    encType="multipart/form-data"
                    onChange={handleUploadImages}
                  />
                  <Button variant="contained" component="span">
                    <UploadFileIcon />
                    {"  "}Upload Product Images
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="counter hor">
                  {counter}
                  <div> Of </div>
                  {ImageUrl.length}
                </div>

                {ImageUrl.length > 0 && (
                  <div className="hor">
                    {counter > 0 && (
                      <ChevronLeftIcon
                        className="left"
                        onClick={() => setCounter((prevState) => prevState - 1)}
                      />
                    )}
                    <img
                      src={ImageUrl[counter]}
                      className="displayImage pointer"
                      alt=""
                      onClick={() => removeData(counter)}
                    />
                    {counter < ImageUrl.length - 1 && (
                      <ChevronRightIcon
                        className="right"
                        onClick={() => setCounter((prevState) => prevState + 1)}
                      />
                    )}
                  </div>
                )}
                {/* {images
                  .map((image) => URL.createObjectURL(image))
                  .map((value, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={value}
                          className="displayImage pointer"
                          alt=""
                          onClick={() => removeData(index)}
                        />
                      </div>
                    );
                  })} */}
              </Grid>
              <Grid item xs={12} sm={12}>
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
                    style={{ marginLeft: "20px" }}
                    onClick={handleSaveImages}
                  >
                    Save Images
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Item Three
          {JSON.stringify(tabValue)}
        </TabPanel>
      </Box>
    </div>
  );
}
export default connect(null, {
  successToast,
  errorToast,
})(CreateProduct);
