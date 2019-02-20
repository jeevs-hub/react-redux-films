import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import DashboardPage from './components/dashboard/dashboard-page';
import SelectFilm from './components/films/select-film/select-film';
import CreateFilm from './components/films/create-film';
import LandingPage from './components/user/auth/landing-page';
import TopNavigation from './components/navigation-bar/navigation-bar';
import UnauthorisedRoute from "./routes/UnauthorisedRoute";
import AuthorisedRoute from "./routes/AuthorisedRoute";

const App = ({location, isAuthenticated}) => (
    <div className="App">
      {isAuthenticated && <TopNavigation />}
      <ToastContainer autoClose={2000} />
      <UnauthorisedRoute location={location} path="/" exact component={LandingPage} />
      <AuthorisedRoute location={location} path="/dashboard" exact component={DashboardPage} />
      <AuthorisedRoute location={location} path="/addFilm" exact component={CreateFilm} />
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