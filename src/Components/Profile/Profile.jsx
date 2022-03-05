import React, { useState, useEffect } from "react";
import NavBar from "../NavBar.jsx";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import "../Style.css";
import Grid from "@mui/material/Grid";
import { stateNames } from "../../Authentication/Constants";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../../Redux/Actions/ToastActions";
import { connect } from "react-redux";
const validationSchema = yup.object({
  fullName: yup.string().required("Name is mandatory field."),
  mobileNumber: yup
    .number()
    .min(1000000000, "Mobile number cannot be less than 10 digits")
    .max(9999999999, "Mobile Number cannot be more than 10 digits.")
    .required("Mobile number is mandatory."),
  houseno: yup.string().required("Please provide the relevant detail."),
  area: yup.string().required("Please provide the relevant detail."),
  townCity: yup.string().required("Please provide the relevant detail."),
  landmark: yup.string().required("Please provide the relevant detail."),
  state: yup.string().required("Please select a State name from dropdown."),
  pincode: yup
    .string()
    .test("len", "Must be exactly 6 characters", (val) => {
      if (val !== undefined) {
        return val.length === 6;
      } else {
        return false;
      }
    })
    .required("Pincode is required."),
});
function Profile(props) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get("/user/profile")
        .then((res) => {
          if (res.data.status === 1) {
            setValue(res.data.data);
          } else {
            props.errorToast("Caught into some issue while fetching profile.");
          }
        })
        .catch((e) => {
          props.errorToast("Caught into some issue while fetching profile.");
          console.log(e);
        });
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      id: null,
      fullName: "",
      mobileNumber: "",
      houseno: "",
      area: "",
      townCity: "",
      landmark: "",
      state: "",
      pincode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { id } = values;
      if (id === null) {
        createAddress(values);
      } else {
        updateAddress(values);
      }
    },
  });
  const createAddress = async (values) => {
    if (value) {
      if (value.Addresses.length > 4) {
        props.successToast("Only 5 Addresses can be saved.");
      } else {
        delete values.id;
        await axios
          .post("/user/address", values)
          .then((res) => {
            if (res.data.status === 1) {
              props.successToast(res.data.message);
              const data = value;
              setValue({
                ...data,
                ...data.Addresses.unshift(res.data.user),
              });
              formik.resetForm();
              setShow(false);
            } else {
              props.errorToast(res.data.message);
            }
          })
          .catch((e) => {
            props.errorToast("Caught into some issue while adding address.");
          });
      }
    }
  };
  const updateAddress = async (values) => {
    await axios
      .put("/user/address", values)
      .then((res) => {
        if (res.data.status === 1) {
          props.successToast(res.data.message);
          setShow(false);
          formik.resetForm();
          const data = value;
          const idArray = data.Addresses.map((val) => val.id);
          const indexedElement = idArray.indexOf(values.id);
          data.Addresses.splice(indexedElement, 1, values);
          setValue({ ...data, Addresses: data.Addresses });
        } else {
          props.errorToast("Caught into some issue while deleting address.");
        }
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Caught into some issue while deleting address.");
      });
  };
  const [show, setShow] = useState(false);
  const handleDelete = async (id) => {
    await axios
      .delete(`/user/address/${id}`)
      .then((res) => {
        if (res.data.status === 1) {
          const data = value;
          const idArray = data.Addresses.map((val) => val.id);
          const indexedElement = idArray.indexOf(id);
          data.Addresses.splice(indexedElement, 1);
          setValue({ ...data, Addresses: data.Addresses });
          props.successToast(res.data.message);
          setShow(false);
          formik.resetForm();
        } else {
          props.errorToast("Caught into some issue while deleting address.");
        }
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Caught into some issue while deleting address.");
      });
  };
  const handleEdit = ({
    id,
    area,
    fullName,
    houseno,
    landmark,
    mobileNumber,
    pincode,
    state,
    townCity,
  }) => {
    formik.setFieldValue("fullName", fullName, true);
    formik.setFieldValue("houseno", houseno, true);
    formik.setFieldValue("landmark", landmark, true);
    formik.setFieldValue("mobileNumber", mobileNumber, true);
    formik.setFieldValue("pincode", pincode, true);
    formik.setFieldValue("state", state, true);
    formik.setFieldValue("townCity", townCity, true);
    formik.setFieldValue("id", id, true);
    formik.setFieldValue("area", area, true);
    setShow(true);
  };
  return (
    <div>
      <NavBar {...props} />
      <Toaster />
      <div className="spacer"></div>
      <div className="border-box">
        <div className="upperForm">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginRight: "20px" }}>User Details</h2>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                fullWidth={true}
                disabled={true}
                value={value === null ? "" : value.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth={true}
                disabled={true}
                value={value === null ? "" : value.username}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-basic"
                label="Mobile No."
                variant="outlined"
                fullWidth={true}
                disabled={true}
                value={value === null ? "" : value.mobile}
              />
            </Grid>
          </Grid>
          <hr style={{ marginTop: "20px" }} />
          {/* Address */}
          <div className="loweBox">
            <div className="hor">
              <h2>Address</h2>
              {show ? (
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    setShow(!show);
                    formik.resetForm();
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    if (value) {
                      if (value.Addresses.length > 4) {
                        props.successToast("Only 5 Addresses can be saved.");
                        setShow(false);
                      } else {
                        setShow(!show);
                      }
                    }
                    formik.resetForm();
                  }}
                >
                  <AddIcon />
                </IconButton>
              )}
            </div>
            <div className="address">
              <Grid container spacing={2}>
                {value &&
                  value.Addresses.map(
                    ({
                      id,
                      fullName,
                      houseno,
                      landmark,
                      mobileNumber,
                      pincode,
                      state,
                      townCity,
                      updatedAt,
                      area,
                    }) => (
                      <Grid item xs={12} sm={6} md={4}>
                        <div key={id} className="addressCard">
                          <div className="partA">
                            <div className="nameDiv hor">
                              <div className="fullName">{fullName}</div>
                              <EditIcon
                                className="pointer"
                                onClick={() =>
                                  handleEdit({
                                    id,
                                    fullName,
                                    houseno,
                                    landmark,
                                    mobileNumber,
                                    pincode,
                                    state,
                                    townCity,
                                    updatedAt,
                                    area,
                                  })
                                }
                              />
                              <DeleteIcon
                                className="pointer"
                                onClick={() => handleDelete(id)}
                              />
                            </div>
                            <div className="mobile">{mobileNumber}</div>
                            <div className="addressLine1">
                              {houseno}, {area}, {landmark}, {townCity}
                            </div>
                            <div className="addressline2">
                              {state}-{pincode}
                            </div>
                          </div>
                          <div className="partB">
                            <div className="lastUpdated">
                              Lastupdated on -{" "}
                              {new Date(updatedAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </Grid>
                    )
                  )}
              </Grid>
            </div>

            <div className="lowerBox-address">
              {show && (
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        label="Full Name"
                        name="fullName"
                        variant="outlined"
                        fullWidth={true}
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.fullName &&
                          Boolean(formik.errors.fullName)
                        }
                        helperText={
                          formik.touched.fullName && formik.errors.fullName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        label="Mobile No."
                        name="mobileNumber"
                        variant="outlined"
                        fullWidth={true}
                        value={formik.values.mobileNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.mobileNumber &&
                          Boolean(formik.errors.mobileNumber)
                        }
                        helperText={
                          formik.touched.mobileNumber &&
                          formik.errors.mobileNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        name="houseno"
                        label="House No."
                        variant="outlined"
                        fullWidth={true}
                        value={formik.values.houseno}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.houseno &&
                          Boolean(formik.errors.houseno)
                        }
                        helperText={
                          formik.touched.houseno && formik.errors.houseno
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        name="area"
                        label="Area/Street"
                        variant="outlined"
                        fullWidth={true}
                        value={formik.values.area}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.area && Boolean(formik.errors.area)
                        }
                        helperText={formik.touched.area && formik.errors.area}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        name="townCity"
                        label="Town/City/Village"
                        variant="outlined"
                        fullWidth={true}
                        value={formik.values.townCity}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.townCity &&
                          Boolean(formik.errors.townCity)
                        }
                        helperText={
                          formik.touched.townCity && formik.errors.townCity
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        name="landmark"
                        label="Landmark"
                        variant="outlined"
                        fullWidth={true}
                        value={formik.values.landmark}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.landmark &&
                          Boolean(formik.errors.landmark)
                        }
                        helperText={
                          formik.touched.landmark && formik.errors.landmark
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          State
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="state"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.state && Boolean(formik.errors.state)
                          }
                        >
                          {stateNames.map((value, i) => (
                            <MenuItem key={i} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        id="outlined-basic"
                        name="pincode"
                        type="number"
                        label="Pin Code"
                        variant="outlined"
                        fullWidth={true}
                        inputProps={{ maxLength: 6 }}
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.pincode &&
                          Boolean(formik.errors.pincode)
                        }
                        helperText={
                          formik.touched.pincode && formik.errors.pincode
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Button
                        type="submit"
                        variant="outlined"
                        fullWidth={true}
                        style={{ height: "55px" }}
                      >
                        Save Details
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { successToast, errorToast })(Profile);
