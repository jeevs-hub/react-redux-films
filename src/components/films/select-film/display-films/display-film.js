import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './display-film.scss';

class DisplayFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            isLoading: false
        }
    }

    componentWillReceiveProps(nextProps) { }


    onChange = (e) => {
        console.log("e ", this.props);
    }

    render() {
        const { filmInfo } = this.props;
        const genres = filmInfo && filmInfo.genres ? filmInfo.genres.map((genre, index) => (<span key={index}>{genre} </span>)) : null;
        const filmImageUrl = filmInfo && filmInfo.imgUrl ? `https://image.tmdb.org/t/p/w500${filmInfo.imgUrl}` : null;
       
        return (
            <div className="display-films-container col-xs-12 col-sm-12">
                <div className="display-films-film-info col-xs-6 col-sm-6">
                    <div className="card-body">
                        <h5 className="card-title">{filmInfo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"><small className="text-muted">{genres ? genres : null}</small></h6>
                        <p className="card-text">{filmInfo.summary}</p>
                    </div>
                </div>
                <div className="dispaly-films-image col-xs-6 col-sm-6">
                    <img src={filmImageUrl} alt={filmInfo.name} />
                </div>
            </div>
        )
    }
};

DisplayFilm.propTypes = {
    filmInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    filmInfo: state.films.filmInfo
})

export default connect(mapStateToProps, null)(DisplayFilm);