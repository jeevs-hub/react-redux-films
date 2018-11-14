import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import DisplayFilms from './components/DisplayFilms';
import CreateFilms from './components/CreateFilms';
import LoginForm from './components/user/Login';
import UnauthorisedRoute from "./routes/UnauthorisedRoute";
import AuthorisedRoute from "./routes/AuthorisedRoute";
import { Route } from 'react-router-dom';

const App = ({location, isAuthenticated}) => (
    <div className="App">
      <UnauthorisedRoute location={location} path="/" exact component={LoginForm} />
      <AuthorisedRoute location={location} path="/dashboard" exact component={DisplayFilms} />
    </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(App);