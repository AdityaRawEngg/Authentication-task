import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setCookie } from "../../helper/cookies";
import { apiCall } from "../../axios";
import { endpoint } from "../../axios/endpoints";
import store from "../../redux/store/store";
import { userActionTypes } from "../../redux/constants/userAction.types";
import userActionGenerator from "../../redux/actions/userAction.generator";
import LoginForm from "../../components/LoginForm";

export default function LoginPage(props) {
  const classes = styles();
  // On Click event handler
  const onLogin = (event) => {
    event.preventDefault();
    const postData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    //login Api call
    apiCall({ url: endpoint.login, body: postData, method: "POST" })
      .then((response) => {
        if (!response.data.success) {
          window.alert(response.data.msg);
          return false;
        }
        setCookie("Token", response.data.token, {
          path: "/",
          expires: new Date(Date.now() + 86400e3 * 2),
        });
        store.dispatch(
          userActionGenerator(userActionTypes.ADD, {
            user: response.data.user,
          })
        );
        props.history.push("/");
      })
      .catch((err) => {
        return err;
      });
  };

  // On Click event handler
  const onRegister = (event) => {
    event.preventDefault();
    props.history.push("/signup");
  };

  return (
    <Container>
      <Box className={classes.box}>
        <Typography variant="h3" color="textSecondary">
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

const styles = makeStyles({
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
});
