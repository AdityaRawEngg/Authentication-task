import { Button, TextField } from "@material-ui/core";

export default function SignUpForm({
  onSignup,
  onLogin,
  classes,
  isOtpGenerated,
}) {
  return (
    <form onSubmit={onSignup} className={classes.form}>
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
      >
        Sign Up
      </Button>
      <Button variant="text" color="secondary" onClick={onLogin}>
        Already Have a account? login
      </Button>
    </form>
  );
}
