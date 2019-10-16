import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthorisedRoute = ({ isAuthenticated, component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props => {
      return isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to="/" />
    }}
  />

AuthorisedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.firstName
  };
}

export default connect(mapStateToProps)(AuthorisedRoute);
