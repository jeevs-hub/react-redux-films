import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { FadeLoader } from 'react-spinners';

import constants from '../../../../utils/constants';
import { register } from '../../../../redux/actions/user-actions';
import './register-form.scss';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
                passwordConfirmation: '',
                firstName: '',
                lastName: '',
                dateOfBirth: undefined
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
        
        if (!EMAIL_VALIDATION.test(data.email)) errors.email = "Invalid email";
        if (!PASSWORD_VALIDATION.test(data.password)) errors.password = errors.passwordConfirmation = "Password must be at least 6 characters and must contain: a capital letter, a lowercase letter and a number";
        if(data.password !== data.passwordConfirmation) errors.password = errors.passwordConfirmation = "Passwords must match";
        if(!data.firstName) errors.firstName = "Must enter a first name";
        if(!data.lastName) errors.lastName = "Must enter a last name";
        if(!data.dateOfBirth) errors.dateOfBirth = "Must enter a date of Birth";

        return errors;
    };

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const { data } = this.state;
            const user = {
                email: data.email,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation, 
                dateOfBirth: data.dateOfBirth.toISOString(),
                firstName: data.firstName, 
                lastName: data.lastName
            }

            this.setState({...this.state, loading: true});

            this.props.register(user)
                .then(() => this.props.userAuthenticated())
                .catch(err => {
                    console.log("err ", err)
                    console.error("errors when trying to login ", err.response.data.error.message);
                    if(err.response.data.error.status === 400) {
                        this.props.displayErrorMessage(err.response.data.error.message);
                    } else {
                        this.props.displayErrorMessage("There was an error registering in. Please try again");                      
                    }
                })
                .finally(() => this.setState({ ...this.state, loading: false }))
        }
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div className="form-container box">
                <div className='sweet-loading'>
                    <FadeLoader sizeUnit={"px"} size={25} color={'#123abc'} loading={this.state.loading} />
                </div>
                <form onSubmit={this.onSubmit}>
                        <div className=" row">
                            <div className="col-sm-12">
                                <input name="firstName" className={`forminput ${errors.firstName ? 'is-invalid' : ''}`} type="text" placeholder="First Name" onChange={this.onChange} value={data.firstName} />
                                {errors.firstName &&
                                <div className="error-field">
                                    {errors.firstName}
                                </div>}
                            </div>
                            <div className="col-sm-12">
                                <input name="lastName" className={`forminput ${errors.lastName ? 'is-invalid' : ''}`} type="text" placeholder="Last Name" onChange={this.onChange} value={data.lastName} />
                                {errors.lastName &&
                                <div className="error-field">
                                    {errors.lastName}
                                </div>}
                            </div>
                            <div className="col-sm-12">
                                <input name="email" className={`forminput ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" type="text" onChange={this.onChange} value={data.email} />
                                {errors.email &&
                                <div className="error-field">
                                    {errors.email}
                                </div>}
                            </div>
                            <div className="col-sm-12 dob">
                                <div className="col-sm-6">
                                    Date of Birth: 
                                </div>
                                <div className={`col-sm-6 register-dob ${errors.dateOfBirth ? 'dob-is-invalid' : ''}`}>
                                    <DatePicker name="dateOfBirth" onChange={(e) => this.onChange({target: { name: 'dateOfBirth', value: e}})} value={data.dateOfBirth} maxDate={new Date()} />
                                    {errors.dateOfBirth &&
                                    <div className="error-field">
                                        {errors.dateOfBirth}
                                    </div>}
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <input name="password" placeholder="Password" className={`forminput ${errors.password ? 'is-invalid' : ''}`} type="password" onChange={this.onChange} value={data.password} />
                                {errors.password &&
                                <div className="error-field">
                                    {errors.password}
                                </div>}
                            </div>
                            <div className="col-sm-12">
                                <input name="passwordConfirmation" placeholder="Password Confirmation" className={`forminput ${errors.passwordConfirmation ? 'is-invalid' : ''}`}type="password" onChange={this.onChange} value={data.passwordConfirmation} />
                                {errors.passwordConfirmation &&
                                <div className="error-field">
                                    {errors.passwordConfirmation}
                                </div>}
                            </div>
                        <div className="col-sm-12 reg-footer">
                            <button type="submit" className="btn btn-register float-right">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

RegisterForm.propTypes = {
    register: PropTypes.func.isRequired,
    userAuthenticated: PropTypes.func.isRequired,
    displayErrorMessage: PropTypes.func.isRequired
}

export default connect(null, { register })(RegisterForm);