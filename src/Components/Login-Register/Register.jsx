import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { successToast, errorToast } from "../../Redux/Actions/ToastActions";
import { connect } from "react-redux";

const validationSchema = yup.object({
  name: yup.string().required("Name is mandatory field."),
  username: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  mobile: yup
    .number()
    .min(1000000000, "Mobile number cannot be less than 10 digits")
    .max(9999999999, "Mobile Number cannot be more than 10 digits.")
    .required("Mobile number is mandatory."),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function SignUp(props) {
  const [isDisabled, setDisabledState] = useState(false);
  const [email, setEmail] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { username } = values;
      setEmail(username);
      await axios
        .post("/auth/register", values)
        .then((response) => {
          if (response.data.status === 1) {
            props.successToast(response.data.message);
            formik.resetForm();
            setDisabledState(true);
          }
        })
        .catch((e) => {
          if (typeof e.response.data.reason === typeof []) {
            toast(
              () => (
                <span>
                  {e.response.data.reason.map((val, index) => (
                    <div key={index}>{val}</div>
                  ))}
                </span>
              ),
              {
                duration: 9000,
                position: "top-center",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }
            );
          } else {
            props.errorToast(e.response.data.message);
          }
        });
    },
  });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const otpHandler = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOtp(e.target.value);
      setOtpError("");
    }
    if (e.target.value.length === 6) {
      const data = { username: email, token: e.target.value };
      setTimeout(async () => {
        await axios
          .post("/auth/verify", data)
          .then((res) => {
            if (res.data.status === 0) {
              setOtpError(res.data.message);
              setOtp("");
              props.errorToast(res.data.message3000);
            }
            if (res.data.status === 1) {
              props.successToast("Token Verification Successfull.");
              window.localStorage.setItem("sid", res.data.token);
              window.localStorage.setItem("rid", res.data.rid);
              setTimeout(() => {
                props.history.push("/profile");
              }, 2000);
            }
          })
          .catch((e) => {
            console.log(e);
            if (e.response.status === 429) {
              props.errorToast(e.response.data, { duration: 6000 });
            } else {
              props.errorToast("Some issue while OTP Verification!!");
            }
          });
      }, 200);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Email"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="mobile"
                    label="Mobile No"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    disabled={isDisabled}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              {!isDisabled && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // disabled={}
                >
                  Sign Up
                </Button>
              )}
              {isDisabled && (
                <div style={{ marginTop: "15px" }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="otp"
                      label="Enter OTP"
                      name="otp"
                      value={otp}
                      onChange={otpHandler}
                      error={otpError.length > 0}
                      helperText={otpError}
                      inputProps={{ maxLength: 6 }}
                    />
                  </Grid>
                </div>
              )}
              {!isDisabled && (
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </form>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default connect(null, { successToast, errorToast })(SignUp);
