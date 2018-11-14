import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/userActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }

        // this.onChange = this.onChange.bind(this);
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            userName: this.state.userName,
            password: this.state.password
        }

        this.props.login(user)
        .then(() => this.props.history.push('/dashboard'))
        .catch(err => console.log("errors when trying to login ", err));
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>User Name: </label><br />
                        <input name="userName" type="text" onChange={this.onChange} value={this.state.userName} />
                    </div>
                    <br />
                    <div>
                        <label>Password: </label><br />
                        <input name="password" type="password" onChange={this.onChange} value={this.state.password} />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
};

LoginForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginForm);