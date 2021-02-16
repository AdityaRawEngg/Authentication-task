import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import userActionGenerator from "../redux/actions/userAction.generator";
import { userActionTypes } from "../redux/constants/userAction.types";

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

function DisplayAlert(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.alertMessage !== "") {
      setOpen(true);
    }
  }, [props.alertMessage]);

  const handleClose = (event) => {
    setOpen(false);
    props.clearAlert();
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.alertStatus.toLowerCase()}>
        {props.alertMessage}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => ({
  alertMessage: state.userReducer.alertMessage,
  alertStatus: state.userReducer.alertStatus,
});
const mapDispatchToProps = (dispatch) => ({
  clearAlert: () =>
    dispatch(
      userActionGenerator(userActionTypes.ERROR, {
        message: "",
        status: "success",
      })
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(DisplayAlert);
