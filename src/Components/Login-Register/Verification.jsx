import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../../Redux/Actions/ToastActions";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Link,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Verification(props) {
  const [open, setopen] = useState(true);
  const [password, setpassword] = useState("");
  let query = useQuery();
  const token = query.get("token");
  const username = query.get("email");
  const flag = query.get("flag");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");

    await axios
      .post("/auth/reset/final", { email: username, token, password })
      .then((response) => {
        const res = response.data;
        if (res.status === 1) {
          props.successToast(res.message);
          setTimeout(() => {
            props.history.push("/login");
          }, 2000);
        }
        if (res.status === 0) {
          props.errorToast(res.data.message, 3000);
        }
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Some issue while verification.");
      });
  };
  useEffect(() => {
    if (
      (token !== null || username !== null) &&
      (flag === "true" || flag === "false")
    ) {
      setTimeout(async () => {
        if (flag === "true") {
          await axios
            .post("/auth/verify", { username, token })
            .then((res) => {
              if (res.data.status === 0) {
                props.errorToast(res.data.message);
                setTimeout(() => {
                  props.history.push("/login");
                }, 3000);
              }
              if (res.data.status === 1) {
                props.successToast("Token Verification Successfull.");
                window.localStorage.setItem("sid", res.data.token);
                window.localStorage.setItem("rid", res.data.rid);
                setTimeout(() => {
                  props.history.push("/profile");
                }, 1000);
              }
            })
            .catch((e) => {
              console.log(e);
              if (e.response.status === 429) {
                props.errorToast(e.response.data);
              } else {
                props.errorToast("Some issue while OTP Verification!!");
              }
              setTimeout(() => {
                props.history.push("/login");
              }, 3000);
            });
        } else {
          setTimeout(async () => {
            // For reset password Change
            await axios
              .post("/auth/reset/verify", { username, token })
              .then((res) => {
                if (res.data.status === 0) {
                  props.errorToast(res.data.message);
                  setTimeout(() => {
                    props.history.push("/login");
                  }, 3000);
                }
                if (res.data.status === 1) {
                  setopen(false);
                  props.successToast("Token Verification Successfull.");
                }
              })
              .catch((e) => {
                console.log(e);
                if (e.response.status === 429) {
                  props.errorToast(e.response.data, { duration: 6000 });
                } else {
                  props.errorToast("Some issue while OTP Verification!!");
                }
                setTimeout(() => {
                  props.history.push("/login");
                }, 2000);
              });
          }, 200);
        }
      }, 200);
    } else {
      props.errorToast("Invalid Request.", { duration: 3000 });
      setTimeout(() => {
        props.history.push("/login");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Toaster />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      {!open && (
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
                Change Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="New password"
                  label="New Password"
                  name="password"
                  autoFocus
                  onChange={(e) => setpassword(e.target.value)}
                  helperText={"Password should be minimum 8 characters."}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={password.length < 8}
                >
                  Change Password
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      Go to Home
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}

export default connect(null, { successToast, errorToast })(Verification);
