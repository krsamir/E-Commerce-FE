import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { successToast, errorToast } from "../../Redux/Actions/ToastActions";
import { connect } from "react-redux";
function ForgotPassword(props) {
  const [open, setOpen] = useState(false);
  const [sentStatus, setSentStatus] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [password, setPassword] = useState("");
  const [otpStatus, setOtpStatus] = useState(true);

  const handleClickOpen = () => {
    setEmail("");
    setOtp("");
    setSentStatus(false);
    setOtpStatus(true);
    setPassword("");
    setOtpError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEvent = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    } else {
      handleClose();
    }
  };

  const handleSend = async () => {
    await axios
      .post("/auth/reset", { email })
      .then((res) => {
        const data = res.data;
        if (data.status === 0) {
          props.errorToast(data.message);
        }
        if (data.status === 1) {
          setSentStatus(true);
          props.successToast(data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Some issue while Sending OTP.");
      });
  };

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
          .post("/auth/reset/verify", data)
          .then((res) => {
            setOtpStatus(true);
            if (res.data.status === 0) {
              setOtpError(res.data.message);
              setOtp("");
              props.errorToast(res.data.message);
            }
            if (res.data.status === 1) {
              props.successToast("Token Verification Successfull.");
              setOtpStatus(false);
            }
          })
          .catch((e) => {
            setOtpStatus(true);
            console.log(e);
            if (e.response.status === 429) {
              props.errorToast(e.response.data);
            } else {
              props.errorToast("Some issue while OTP Verification!!");
            }
          });
      }, 200);
    }
  };

  const handleApprove = async () => {
    await axios
      .post("/auth/reset/final", { email, token: otp, password })
      .then((response) => {
        const res = response.data;
        if (res.status === 1) {
          props.successToast(res.message);
          handleClose();
        }
        if (res.status === 0) {
          props.errorToast(res.data.message, 3000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Forgot Password ?
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseEvent}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>
          {sentStatus ? "Enter OTP" : "Forgot Password ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {sentStatus
              ? "Please enter the OTP recieved in your email before it expires."
              : "Please provide your Email. An Otp will sent to the provided email-id."}
          </DialogContentText>
          {sentStatus ? (
            <div>
              <TextField
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={otpHandler}
                error={otpError.length > 0}
                helperText={otpError}
                style={{ marginTop: "20px" }}
                inputProps={{ maxLength: 6 }}
              />
              <TextField
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={password}
                helperText={"Password should be minimum 8 characters."}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ marginTop: "20px" }}
                disabled={otpStatus}
              />
            </div>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          {sentStatus ? (
            <Button
              onClick={handleApprove}
              disabled={otpStatus && password.length < 8}
            >
              Approve
            </Button>
          ) : (
            <Button onClick={handleSend}>Send</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, { successToast, errorToast })(ForgotPassword);
