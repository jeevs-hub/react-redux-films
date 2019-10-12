import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './login/login-form';
import RegisterForm from './register/register-form';
import { toast } from 'react-toastify';
import './landing-page.css';

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
            <div className="landing-page-background">
                <div className={`col-xs-12 col-sm-4 landing-page-modal-container ${!showLogin && `register-component`}`}>
                    <ul className="nav nav-tabs nav-fill">
                        <li className="nav-item">
                            <span className={`nav-link ${showLogin ? 'landing-page-active-btn' : 'landing-page-inactive-btn'}`} onClick={() => this.onChange(true)}>Login</span>
                        </li>
                        <li className="nav-item">
                            <span className={`nav-link ${!showLogin ? 'landing-page-active-btn' : 'landing-page-inactive-btn'}`} onClick={() => this.onChange(false)}>Register</span>
                        </li>
                    </ul>
                    <div className="components">
                        {showLogin ?
                            <LoginForm userAuthenticated={this.userAuthenticated} displayErrorMessage={this.displayErrorMessage} history={this.props.history} /> :
                            <RegisterForm userAuthenticated={this.userAuthenticated} displayErrorMessage={this.displayErrorMessage} history={this.props.history} />}
                    </div>
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