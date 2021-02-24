import { connect } from "react-redux";
import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getCookie } from "../../helper/cookies";
import { userActionTypes } from "../../redux/constants/userAction.types";
import userActionGenerator from "../../redux/actions/userAction.generator";
import LoginForm from "../../components/LoginForm";

function LoginPage(props) {
  const classes = styles();
  // On Click event handler
  const onLogin = async (event) => {
    event.preventDefault();
    const postData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    await props.login(postData);
    props.history.push("/");
  };

  // On Click event handler
  const onRegister = (event) => {
    event.preventDefault();
    props.history.push("/signup");
  };
  if (getCookie("Token")) {
    props.history.push("/");
  }
  return (
    <Container>
      <Box className={classes.box}>
        <Typography variant="h1" color="textPrimary">
          Login
        </Typography>
        <LoginForm
          onRegister={onRegister}
          onLogin={onLogin}
          classes={classes}
        />
      </Box>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload = {}) =>
      dispatch(userActionGenerator(userActionTypes.ADD, payload)),
  };
};

const styles = makeStyles((theme) => ({
  box: {
    border: "1px solid blue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "60%",
    margin: "5% auto",
    padding: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    width: "60%",
    marginBottom: "10px",
  },
  loginBtn: {
    width: "60%",
  },
}));

export default connect(null, mapDispatchToProps)(LoginPage);
