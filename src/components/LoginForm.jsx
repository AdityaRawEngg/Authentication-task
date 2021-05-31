import { Button, TextField } from "@material-ui/core";
export default function LoginForm({ onLogin, onRegister, classes }) {
  return (
    <form onSubmit={onLogin} className={classes.form}>
      <TextField
        required
        className={classes.inputField}
        variant="outlined"
        label="Email"
        name="email"
        type="email"
        autoFocus
      />
      <TextField
        required
        className={classes.inputField}
        variant="outlined"
        label="password"
        type="password"
        name="password"
      />
      <Button
        className={classes.loginBtn}
        variant="outlined"
        color="primary"
        type="submit"
        id="login"
      >
        Login
      </Button>
      <Button
        variant="text"
        color="secondary"
        id="register"
        onClick={onRegister}
      >
        Does not have an account? Register
      </Button>
    </form>
  );
}
