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
    if (props.message !== "") {
      setOpen(true);
    }
  }, [props.message]);

  const handleClose = (event) => {
    setOpen(false);
    props.clearAlert();
  };

  return (
    <>
      {props.status === "" ? (
        <></>
      ) : (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={props.status.toLowerCase()}>
            {props.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  message: state.alertReducer.message,
  status: state.alertReducer.status,
});
const mapDispatchToProps = (dispatch) => ({
  clearAlert: () => dispatch(userActionGenerator(userActionTypes.CLEARERROR)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DisplayAlert);
