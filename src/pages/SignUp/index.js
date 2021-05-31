import { useState } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { apiCall } from "../../axios";
import { endpoint } from "../../axios/endpoints";
import SignUpForm from "../../components/SignUpFrom";

export default function SignUpPage(props) {
  const [isOtpGenerated, setGeneratedValue] = useState(false);

  const onSignup = (event) => {
    event.preventDefault();
    const postData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      password: event.target.password.value,
      otpResponse: event.target.otp ? event.target.otp.value : undefined,
    };
    if (!postData.otpResponse) {
      apiCall({ url: endpoint.generateOTP, body: postData, method: "POST" })
        .then((response) => {
          setGeneratedValue(true);
        })
        .catch((err) => {
          return err;
        });
    } else {
      // Sign Up

      apiCall({ url: endpoint.signup, body: postData, method: "POST" })
        .then((response) => {
          console.log(response);
          props.history.push("/");
        })
        .catch((err) => {
          return err;
        });
    }
  };

  //OnClick event handler
  const onLogin = (event) => {
    event.preventDefault();

    props.history.push("/login");
  };

  const classes = styles();
  return (
    <Container>
      <Box className={classes.box}>
        <Typography variant="h1" color="textSecondary">
          Sign Up
        </Typography>
        <SignUpForm
          onSignup={onSignup}
          onLogin={onLogin}
          classes={classes}
          isOtpGenerated={isOtpGenerated}
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
  signUpBtn: {
    width: "60%",
  },
});
