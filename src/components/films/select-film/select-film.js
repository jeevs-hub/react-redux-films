import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import AddFilms from './add-films/add-films';
import DisplayFilm from './display-films/display-film';
import { getFilmInfo } from '../../../redux/actions/film-actions';
import './select-film.scss';

class SelectFilmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilmId: 0
        }
    }

    userAuthenticated = () => this.props.history.push('/dashboard');

    displayErrorMessage = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
    });

    filmSelected = (selectedFilmId) => {
        console.log("film selected ", selectedFilmId);
        this.setState({ ...this.state, selectedFilmId });
        this.props.getFilmInfo(selectedFilmId)
            .catch(err => {
                console.error("Error getting film information ", err);
                this.displayErrorMessage("Error getting film information. Please try again");
            })
            .finally(() => this.setState({ ...this.state, loading: false }))

    }



    render() {
        const { selectedFilmId } = this.state;
        console.log("the select film ", selectedFilmId)
        return (
            <div className="col-xs-12 col-sm-10 select-film-container">
                <div className="row">
                    <AddFilms filmSelected={this.filmSelected} />
                </div>
                {selectedFilmId > 0 &&
                    <div className="select-film-display">
                        <DisplayFilm selectedFilmId={selectedFilmId} />
                    </div>
                }
            </div>
        )
    }
};

SelectFilmPage.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    getFilmInfo: PropTypes.func.isRequired
}

export default withRouter(connect(null, { getFilmInfo })(SelectFilmPage));