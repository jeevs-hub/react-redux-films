import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FadeLoader } from 'react-spinners';

import constants from '../../../../utils/constants';
import { login } from '../../../../redux/actions/user-actions';
import './login-form.scss';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                password: ''
            },
            loading: false,
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    validate = (data) => {
        const errors = {};
        const { PASSWORD_VALIDATION, EMAIL_VALIDATION } = constants;
        if (!EMAIL_VALIDATION.test(data.username)) errors.username = "invalid email";
        if (!PASSWORD_VALIDATION.test(data.password)) errors.password = "password must be at least 6 characters";
        return errors;
    };

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            const user = {
                username: this.state.data.username,
                password: this.state.data.password
            }

            this.setState({ ...this.state, loading: true });

            this.props.login(user)
                .then(() => this.props.userAuthenticated())
                .catch(err => {
                    console.error("errors when trying to login ", err);
                    if (err.status === 400) {
                        this.props.displayErrorMessage("Incorrect Username or Password");
                    } else {
                        this.props.displayErrorMessage("There was an error logging in. Please try again");
                    }
                })
                .finally(() => this.setState({ ...this.state, loading: false }))


        }
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div className="form-container">
                <div className='sweet-loading'>
                    <FadeLoader sizeUnit={"px"} size={25} color={'#123abc'} loading={this.state.loading} />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-sm-12">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Email: </label><br />
                            <div className="col-sm-10">
                                <input name="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`} type="text" onChange={this.onChange} value={data.username} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Password: </label>
                            <div className="col-sm-10">
                                <input name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} type="password" onChange={this.onChange} value={data.password} />
                            </div>
                        </div>
                        <div className="form-group login-form-footer">
                            <span className="float-left">Reset password</span>
                            <button type="submit" className="btn btn-primary float-right">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    makeCancelable = (promise) => {
        let hasCanceled_ = false;

        const wrappedPromise = new Promise((resolve, reject) => {
            promise.then(
                val => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
                error => hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
            );
        });

        return {
            promise: wrappedPromise,
            cancel() {
                hasCanceled_ = true;
            },
        };
    };
};

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    userAuthenticated: PropTypes.func.isRequired,
    displayErrorMessage: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginForm);