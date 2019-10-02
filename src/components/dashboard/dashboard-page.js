import React from 'react';
import PropTypes from 'prop-types';
import DisplayFilms from './display-films/display-films';
import { toast } from 'react-toastify';
import './dashboard-page.scss';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onChange = (e) => this.setState({ showLogin: e });

    userAuthenticated = () => this.props.history.push('/dashboard');
    
    displayErrorMessage = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
    });

    render() {
        return (
            <div className="">
                <div className="col-xs-12 col-sm-12">
                    <DisplayFilms history={this.props.history}/>
                </div>
            </div>
        )
    }
};

DashboardPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default DashboardPage;