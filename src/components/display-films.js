import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms } from '../redux/actions/film-actions';
import Ratings from 'react-ratings-declarative';
import './display-films.scss';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class DisplayFilms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            previousSortedBy: 'releaseDate',
            isAsc: true,
            modalIsOpen: false,
            selectedFilm: null
        }
    }

    componentWillMount() {
        this.props.fetchFilms();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, data: nextProps.films });
    }

    getRunTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let ms = mins % 60;
        return `${hours} ${hours === 1 ? 'hour ' : 'hours '} ${ms} mins`
    }

    sortFilms = (sortBy) => {
        const { data, previousSortedBy, isAsc } = this.state;
        let isAscending = previousSortedBy === sortBy ? !isAsc : isAsc;
        console.log(`is ASC ${isAscending}`)
        let sortedData;
        if (isAscending) {
            sortedData = data.sort((a, b) => {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            });
            isAscending = true;
        } else {
            sortedData = data.sort((a, b) => {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            });
            isAscending = false;
        }
        this.setState({ ...this.state, data: sortedData, previousSortedBy: sortBy, isAsc: isAscending });
    }

    closeModal = () => {
        this.setState({ ...this.state, modalIsOpen: false });
    }

    render() {

        const { data, selectedFilm } = this.state;
        const genres = selectedFilm && selectedFilm.genres ? selectedFilm.genres.map((genre, index) => (<span key={index}>{genre} </span>)) : null;
        const filmImageUrl = selectedFilm && selectedFilm.photoUrl ? `https://image.tmdb.org/t/p/w500${selectedFilm.photoUrl}` : null;
        console.log("selected Film ", selectedFilm, filmImageUrl)
        return (
            <div className="display-center">
                {selectedFilm && <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="col-xs-6 col-sm-12">
                        <div className="card-body">
                            <h5 className="card-title film-modal-title">{selectedFilm.name}</h5>
                            <div className="display-film-modal-div">
                                <h6 className="card-subtitle mb-2 text-muted genres-list"><small className="text-muted">{genres ? genres : null}</small></h6>
                                <div className="rating-modal">
                                    <Ratings
                                        rating={selectedFilm.rating / 2}
                                        widgetRatedColors="rgb(218,165,32)"
                                        widgetHoverColors="rgb(218,165,32)"
                                    >
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                    </Ratings>
                                </div>
                            </div>
                            <p className="card-text col-sm-12">{selectedFilm.summary}</p>
                            <div className="dispaly-films-image col-xs-6 col-sm-6">
                                <img src={filmImageUrl} alt={selectedFilm.name} />
                            </div>
                        </div>
                    </div>
                </Modal>}
                <h1>DisplayFilms</h1>
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-header">
                        <tr>
                            <th scope="col" onClick={() => this.sortFilms('name')}>Name</th>
                            <th scope="col" onClick={() => this.sortFilms('runtime')}>Time</th>
                            <th scope="col" onClick={() => this.sortFilms('releaseDate')}>Release Date</th>
                            <th scope="col" onClick={() => this.sortFilms('watchByDate')}>Watch By Date</th>
                            <th scope="col" onClick={() => this.sortFilms('rating')}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             data.map((film, index) => (
                                <tr key={index} onClick={() => this.setState({ ...this.state, modalIsOpen: true, selectedFilm: film })}>
                                    <th scope="row">{film.name}</th>
                                    <td>{this.getRunTime(film.runtime)}</td>
                                    <td>{film.releaseDate}</td>
                                    <td>{new Date(film.watchByDate).toISOString().split('T')[0]}</td>
                                    <td>{film.rating}</td>
                                </tr>
                            )) 
                        }
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