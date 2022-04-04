import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField, Grid, Button } from "@mui/material";
import { connect } from "react-redux";
import { closeModal } from "../Redux/Actions/LoginAction";
import { successToast, errorToast } from "../Redux/Actions/ToastActions";
import { getCart } from "../Redux/Actions/ProductActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./Style.css";
import axios from "axios";

function LoginModal(props) {
  const [isDisabled, setDisabled] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    props.closeModal();
    setDisabled(false);
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async () => {
    await axios
      .post("/auth/login", { email, password })
      .then((res) => {
        if (res.data.status === 0) {
          props.errorToast(res.data.message);
        }
        if (res.data.status === 1) {
          props.successToast(res.data.message);
          const token = res.data.token;
          const rid = res.data.rid;
          window.localStorage.setItem("sid", token);
          window.localStorage.setItem("rid", rid);
          props.closeModal();
          props.getCart();
        }
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Some issue while logging you in!!");
      });
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      open={props.modalState}
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ textAlign: "center" }}>Login</DialogTitle>
      <div className="modalBody">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              focused={true}
              onFocus={() => setDisabled(false)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              onFocus={() => setDisabled(false)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              variant="contained"
              fullWidth
              disabled={isDisabled}
              onClick={() => {
                handleSubmit();
              }}
            >
              {isDisabled ? "Logging you in !!" : "Login"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  modalState: state.account.modalState,
});
export default connect(mapStateToProps, {
  closeModal,
  successToast,
  errorToast,
  getCart,
})(LoginModal);
