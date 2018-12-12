import React, { Component } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
// import { App } from "../components/App";
import App from "../components/App";
import firebase from "../helpers/firebase";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, clearUser } from "../actions";
import "../components/Auth/css/auth.css";
import { Spinner } from "../helpers/spinner";

class Layout extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }

  render() {
    // return(
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

export default connect(
  mapStateToProps,
  { setUser, clearUser }
)(withRouter(Layout));
