import * as React from "react";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { connect } from "react-redux";
import { closeModal } from "../Redux/Actions/LoginAction";
function LoginModal(props) {
  const handleClose = () => {
    props.closeModal();
  };
  return (
    <Dialog onClose={handleClose} open={props.modalState}>
      <DialogTitle>Login</DialogTitle>
      <List sx={{ pt: 0 }}>12345</List>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  modalState: state.account.modalState,
});
export default connect(mapStateToProps, { closeModal })(LoginModal);
