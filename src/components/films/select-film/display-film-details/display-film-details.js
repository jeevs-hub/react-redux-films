import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './display-film-details.scss';

class DisplayFilmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            isLoading: false,
            filmInfo: this.props.filmInfo
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, filmInfo: nextProps.filmInfo })
    }

    render() {
        const { filmInfo } = this.state;
        const genres = filmInfo && filmInfo.genres ? filmInfo.genres.map((genre, index) => (<li key={index}>{genre} <br /></li>)) : null;
        const filmImageUrl = filmInfo && filmInfo.imgUrl ? `https://image.tmdb.org/t/p/w500${filmInfo.imgUrl}` : null;

        return (
            <div className="display-films-container col-xs-12 col-sm-12">
                <div className="dispaly-films-image col-xs-6 col-sm-6">
                    <img src={filmImageUrl} alt={filmInfo.name} />
                </div>
                {/* <div className="display-films-film-info col-xs-6 col-sm-6"> */}
                <div className="col-xs-6 col-sm-6">
                    <div className="card-body">
                        <h5 className="card-title">{filmInfo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted genres-list"><div className="text-muted">{genres ? (
                            <div>
                                <div>
                                    Genres:
                                </div>
                                <small>
                                    <ul>
                                        {genres}
                                    </ul>
                                </small>
                            </div>
                        ) : null}</div></h6>
                        <p className="card-text summary-text">{filmInfo.summary}</p>
                    </div>
                </div>
            </div>
        )
    }
};

DisplayFilmDetails.propTypes = {
    filmInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    filmInfo: state.films.filmInfo
})

export default connect(mapStateToProps, null)(DisplayFilmDetails);