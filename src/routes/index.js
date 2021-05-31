import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Navigation from "../components/Navigation";
import DisplayAlert from "../components/DisplayAlert";
import PageNotFound from "../components/PageNotFound";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <DisplayAlert />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Router;
