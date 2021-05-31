import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { removeCookie } from "../helper/cookies";

function Navigation(props) {
  // On logout button click
  const onLogout = (event) => {
    event.preventDefault();
    removeCookie("Token");
    props.history.push("/login");
  };
  const onSignup = (event) => {
    event.preventDefault();
    props.history.push("/signup");
  };
  const onLogin = (event) => {
    event.preventDefault();
    props.history.push("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {props.location.pathname === "/" ? (
          <Button id="logout" color="inherit" onClick={onLogout}>
            Logout
          </Button>
        ) : props.location.pathname === "/login" ? (
          <Button color="inherit" onClick={onSignup}>
            Register
          </Button>
        ) : (
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Navigation);
