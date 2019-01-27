import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './login/login-form';
import RegisterForm from './register/register-form';
import { toast } from 'react-toastify';

import './landing-page.scss';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        }
    }

    onChange = (e) => this.setState({ showLogin: e });

    userAuthenticated = () => this.props.history.push('/dashboard');
    
    displayErrorMessage = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
    });

    render() {
        const { showLogin } = this.state;
        return (
            <div className="background">
                <div className="col-xs-12 col-sm-4 modal-container">
                    <ul className="nav nav-tabs nav-fill">
                        <li className="nav-item">
                            <span className={`nav-link ${showLogin ? 'active-btn' : 'inactive-btn'}`} onClick={() => this.onChange(true)}>Login</span>
                        </li>
                        <li className="nav-item">
                            <span className={`nav-link ${!showLogin ? 'active-btn' : 'inactive-btn'}`} onClick={() => this.onChange(false)}>Register</span>
                        </li>
                    </ul>
                    {showLogin ?
                        <LoginForm userAuthenticated={this.userAuthenticated} displayErrorMessage={this.displayErrorMessage} history={this.props.history} /> :
                        <RegisterForm userAuthenticated={this.userAuthenticated} displayErrorMessage={this.displayErrorMessage} history={this.props.history} />}
                </div>
            </div>
        )
    }
};

LandingPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default LandingPage;