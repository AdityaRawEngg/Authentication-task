import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Navigation from "../components/Navigation";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Router;