import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import userActionGenerator from "../../redux/actions/userAction.generator";
import { userActionTypes } from "../../redux/constants/userAction.types";
import { getCookie } from "../../helper/cookies";
import UserDetails from "../../components/UserDetails";
import Editor from "../../components/SunEditor";
// import Editor from "../../components/SlateEditor";

class Home extends Component {
  componentDidMount() {
    if (Object.keys(this.props.user).length === 0) {
      this.props.getUser();
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
          <Editor />
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

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(userActionGenerator(userActionTypes.GET)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
