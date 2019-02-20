import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user-actions';

const TopNavigation = ({ user, logout }) => (
    <nav className="navbar navbar-expand bg-theme">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/dashboard">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/addFilm/selectFilm">Add Films</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/addFilm">Add Films</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/select">Select</a>
                </li>
            </ul>
        </div>
    </nav>
);

TopNavigation.propTypes = {
    user: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user.token
    }
}

export default connect(mapStateToProps, { logout })(TopNavigation);