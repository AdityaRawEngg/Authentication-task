import { Button, TextField } from "@material-ui/core";

export default function SignUpForm({
  onSignup,
  onLogin,
  classes,
  isOtpGenerated,
}) {
  return (
    <form
      data-testid="signup"
      id="signupForm"
      onSubmit={onSignup}
      className={classes.form}
      name="signupForm"
    >
      <TextField
        required
        variant="outlined"
        label="Name"
        name="name"
        type="text"
        className={classes.inputField}
        autoFocus
      />
      <TextField
        required
        className={classes.inputField}
        variant="outlined"
        label="Email"
        name="email"
        type="email"
      />
      <TextField
        required
        className={classes.inputField}
        variant="outlined"
        label="Password"
        name="password"
        type="password"
      />
      <TextField
        required
        className={classes.inputField}
        variant="outlined"
        label="Phone"
        name="phone"
        type="tel"
      />
      {isOtpGenerated ? (
        <TextField
          required
          className={classes.inputField}
          variant="outlined"
          label="OTP"
          name="otp"
          type="password"
        />
      ) : (
        <></>
      )}

      <Button
        className={classes.signUpBtn}
        variant="contained"
        color="primary"
        type="submit"
        id="signupbtn"
      >
        Sign Up
      </Button>
      <Button variant="text" color="secondary" id="loginbtn" onClick={onLogin}>
        Already Have a account? login
      </Button>
    </form>
  );
}
