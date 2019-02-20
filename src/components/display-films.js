import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms } from '../redux/actions/film-actions';

class DisplayFilms extends Component {

    componentWillMount() {
        this.props.fetchFilms();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newFilm) {
            this.props.films.unshift(nextProps.newFilm);
        }
    }

    render() {
        const films = this.props.films.map((film, index) => (
            <tr key={index}>
                <th scope="row">{index}</th>
                <td>{film.title}</td>
                <td>{film.body}</td>
            </tr>
        ))
        return (
            <div className="display-center">
                <h1>DisplayFilms</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">1</th>
                            <th scope="col">2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films}
                    </tbody>
                </table>

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