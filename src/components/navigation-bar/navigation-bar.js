import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user-actions';
import './naviation-bar.scss'
const TopNavigation = ({ logout }) => (
    <nav className="navbar navbar-expand bg-theme">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/dashboard">
                        <button className="btn btn-nav btn-hover btn1">
                            Home
                        </button>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/addFilm"><button className="btn btn-nav btn-hover btn1">Add Films</button></a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item log-out">
                    <a className="nav-link nav-logout" onClick={() => logout()}><button className="btn btn-nav btn-hover btn1">Logout</button></a>
                </li>
            </ul>
        </div>
    </nav>
);

TopNavigation.propTypes = {
    // user: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        // user: state.user.token
    }
}

export default connect(mapStateToProps, { logout })(TopNavigation);