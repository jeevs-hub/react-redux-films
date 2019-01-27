import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms } from '../redux/actions/film-actions';

class DisplayFilms extends Component {
    
    componentWillMount() {
        this.props.fetchFilms();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newFilm) {
            this.props.films.unshift(nextProps.newFilm);
        }
    }

    render() {
        const films = this.props.films.map((film) => (
            <div key={JSON.stringify(film)}>
                <h3>{film.title}</h3>
                <p>{film.body}</p>
            </div>
        ))
        return (
            <div>
                <h1>DisplayFilms</h1>
                {films}
            </div>
        )
    }
}

DisplayFilms.propTypes = {
    fetchFilms: PropTypes.func.isRequired,
    films: PropTypes.array.isRequired,
    film: PropTypes.object
}

const mapStateToProps = (state) => ({
    films: state.films.films,
    newFilm: state.films.film
})

export default connect(mapStateToProps, { fetchFilms })(DisplayFilms);