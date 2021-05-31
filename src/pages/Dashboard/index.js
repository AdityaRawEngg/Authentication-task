import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";
import userActionGenerator from "../../redux/actions/userAction.generator";
import { userActionTypes } from "../../redux/constants/userAction.types";
import { getCookie } from "../../helper/cookies";
import UserDetails from "../../components/UserDetails";

// import Editor from "../../components/SlateEditor";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  static getDerivedStateFromProps(nextProps) {
    if (Object.keys(nextProps.user).length === 0) {
      nextProps.getUser();
    }
    return { user: nextProps.user };
  }

  render() {
    return (
      <>
        {getCookie("Token") ? null : <Redirect to="/login" />}
        <Container>
          <Typography variant="h1" align="center" color="textSecondary">
            Dashboard
          </Typography>
          <UserDetails {...this.state} />
          {/* <Editor /> */}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.userReducer.user });

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(userActionGenerator(userActionTypes.GET)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
