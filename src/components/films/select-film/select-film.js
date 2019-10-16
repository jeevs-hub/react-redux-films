import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import AddFilms from './add-films/add-films';
import DisplayFilmDetails from './display-film-details/display-film-details';
import { getFilmInfo, filmSelected } from '../../../redux/actions/film-actions';
import './select-film.scss';

class SelectFilmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmInfo: this.props.filmInfo,
            isEdit: this.props.isEdit
        }
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({...this.state, filmInfo: nextProps.filmInfo})
    }

    displayErrorMessage = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
    });

    filmSelected = (selectedFilmId) => {
        if(selectedFilmId) {
            this.props.getFilmInfo(selectedFilmId)
            .catch(err => {
                console.error("Error getting film information ", err);
                this.displayErrorMessage("Error getting film information. Please try again");
            })
            .finally(() => this.setState({ ...this.state, loading: false }))
        }
    }

    render() {
        const { filmInfo, isEdit } = this.state;
        return (
            <div className="col-xs-12 col-sm-12">
                {!isEdit && <div className="row">
                    <AddFilms filmSelected={this.filmSelected} />
                </div>}
                {filmInfo.name &&
                    <div className="select-film-display">
                        <DisplayFilmDetails  />
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
    getFilmInfo: PropTypes.func.isRequired,
    filmSelected: PropTypes.func.isRequired,
    filmInfo: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    filmInfo: state.films.filmInfo,
    isEdit: state.films.isEdit
})

export default withRouter(connect(mapStateToProps, { getFilmInfo, filmSelected })(SelectFilmPage));