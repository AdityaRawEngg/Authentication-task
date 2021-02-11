import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import store from "../../redux/store/store";
import userActionGenerator from "../../redux/actions/userAction.generator";
import { userActionTypes } from "../../redux/constants/userAction.types";
import { getCookie, removeCookie } from "../../helper/cookies";
import { apiCall } from "../../axios";
import { endpoint } from "../../axios/endpoints";
import UserDetails from "../../components/UserDetails";

class Home extends Component {
  componentDidMount() {
    if (getCookie("Token") && !this.props.user.name) {
      apiCall({
        url: endpoint.userDetails,
        method: "GET",
        headers: { Authorization: `Bearer ${getCookie("Token")}` },
      })
        .then((response) => {
          store.dispatch(
            userActionGenerator(userActionTypes.ADD, {
              user: response.data.user,
            })
          );
          return response;
        })
        .catch((err) => {
          removeCookie("Token");
          this.props.history.push("/login");
          return err;
        });
    }
  }

  render() {
    return (
      <>
        {getCookie("Token") ? null : <Redirect to="/login" />}
        <div>
          <Typography variant="h1" align="center" color="textSecondary">
            Dashboard
          </Typography>
          <UserDetails {...this.props} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(Home);
