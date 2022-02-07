import React from "react";
import NavBar from "../NavBar.jsx";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "../Style.css";
import Grid from "@mui/material/Grid";
import { stateNames, address } from "../../Authentication/Constants";
import * as yup from "yup";
import { useFormik } from "formik";

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
  const value = {
    name: "Samir Kumar",
    email: "samirkumar2527@gmail.com",
    mobileNo: 7079583248,
  };
  const formik = useFormik({
    initialValues: {
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
      console.log(values);
      // const { username } = values;
      // setEmail(username);
      // await axios
      //   .post("/auth/register", values)
      //   .then((response) => {
      //     if (response.data.status === 1) {
      //       toast.success(response.data.message, { duration: 6000 });
      //       formik.resetForm();
      //       setDisabledState(true);
      //     }
      //   })
      //   .catch((e) => {
      //     if (typeof e.response.data.reason === typeof []) {
      //       toast(
      //         () => (
      //           <span>
      //             {e.response.data.reason.map((val, index) => (
      //               <div key={index}>{val}</div>
      //             ))}
      //           </span>
      //         ),
      //         {
      //           duration: 9000,
      //           position: "top-center",
      //           style: {
      //             borderRadius: "10px",
      //             background: "#333",
      //             color: "#fff",
      //           },
      //         }
      //       );
      //     } else {
      //       toast.error(e.response.data.message, {
      //         duration: 6000,
      //         position: "top-center",
      //         style: {
      //           borderRadius: "10px",
      //           background: "#333",
      //           color: "#fff",
      //         },
      //       });
      //     }
      //   });
    },
  });
  return (
    <div>
      <NavBar {...props} />
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
                value={value.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth={true}
                disabled={true}
                value={value.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-basic"
                label="Mobile No."
                variant="outlined"
                fullWidth={true}
                disabled={true}
                value={value.mobileNo}
              />
            </Grid>
          </Grid>
          <hr style={{ marginTop: "20px" }} />
          {/* Address */}
          <div className="loweBox">
            <h2>Address</h2>
            <div className="lowerBox-address">
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
                        formik.touched.houseno && Boolean(formik.errors.houseno)
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
                      error={formik.touched.area && Boolean(formik.errors.area)}
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
                        formik.touched.pincode && Boolean(formik.errors.pincode)
                      }
                      helperText={
                        formik.touched.pincode && formik.errors.pincode
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button type="submit" variant="outlined" fullWidth={true}>
                      Save Details
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
