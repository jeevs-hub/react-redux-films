import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms, filmSelected } from '../../../redux/actions/film-actions';

import './display-films.scss';

class DisplayFilms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            previousSortedBy: 'releaseDate',
            isAsc: true,
            modalIsOpen: false,
            selectedFilm: null,
            filterBy: '',
            totalPages: 0,
            currentPage: 0,
            count: 0
        }
        this.pageSize = 10
    }

    componentWillMount() {
        const { filterBy, previousSortedBy, isAsc } = this.state;
        this.props.fetchFilms(0, filterBy, previousSortedBy, isAsc);
    }

    componentWillReceiveProps(nextProps) {
        const { data } = this.state;
        if (data !== nextProps.films) {
            const totalPages = Math.ceil(nextProps.count / this.pageSize);
            this.setState({ ...this.state, data: nextProps.films, count: nextProps.count, totalPages });

        }
    }

    getRunTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let ms = mins % 60;
        return `${hours} ${hours === 1 ? 'hour ' : 'hours '} ${ms} mins`
    }

    sortFilms = (sortBy) => {
        const { previousSortedBy, isAsc, currentPage, filterBy } = this.state;
        let isAscending = previousSortedBy === sortBy ? !isAsc : isAsc;
        this.props.fetchFilms(currentPage * this.pageSize, filterBy, previousSortedBy, isAscending);

        // let sortedData;
        // if (isAscending) {
        //     sortedData = data.sort((a, b) => {
        //         return a[sortBy] > b[sortBy] ? 1 : -1;
        //     });
        //     isAscending = true;
        // } else {
        //     sortedData = data.sort((a, b) => {
        //         return a[sortBy] < b[sortBy] ? 1 : -1;
        //     });
        //     isAscending = false;
        // }
        this.setState({ ...this.state, previousSortedBy: sortBy, isAsc: isAscending });
    }

    closeModal = () => {
        this.setState({ ...this.state, modalIsOpen: false });
    }

    filter = (e) => {
        this.setState({ ...this.state, filterBy: e.target.value })
    }

    filmSelected = (filmInfo) => {
        this.props.filmSelected(filmInfo, true);
        this.props.history.push('/editFilm')
    }

    search = (page) => {
        const { filterBy, previousSortedBy, isAsc } = this.state;
        this.setState({ ...this.state, currentPage: page })
        this.props.fetchFilms(page * this.pageSize, filterBy, previousSortedBy, isAsc);
    }

    filterResults = () => {
        const { filterBy, previousSortedBy, isAsc } = this.state;
        this.setState({ ...this.state, currentPage: 0 })
        this.props.fetchFilms(0, filterBy, previousSortedBy, isAsc);
    }

    getPages = () => {
        const { currentPage, totalPages } = this.state;

        let pages = [];
        let start = Math.max(0, currentPage - 2);
        let end = Math.min(totalPages, start + 5);
        if (currentPage > 0) {
            pages.push(
                <li onClick={() => this.search(0)}>
                    <a className="page-link">
                        <span aria-hidden="true">&laquo;</span>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            )
            pages.push(
                <li onClick={() => this.search(currentPage - 1)}>
                    <a className="page-link">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            )
        }
        for (let i = start; i < end; i++) {
            pages.push(
                <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i} onClick={() => this.search(i)}>
                    <a className="page-link" href="#">{i + 1}</a>
                </li>
            );
        }

        if(currentPage < totalPages - 1) {
            pages.push(
                <li onClick={() => this.search(currentPage + 1)}>
                    <a className="page-link">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            )
            pages.push(
                <li onClick={() => this.search(totalPages - 1)}>
                    <a className="page-link">
                        <span aria-hidden="true">&raquo;</span>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            )
        }

        return (<nav className="footer-center">
            <ul className="pagination">
                {pages}
            </ul>
        </nav>)
    }

    render() {

        const { data, filterBy } = this.state;
        const pages = this.getPages();
        return (
            <div className="display-center">
                <h1>Display Films</h1>
                <div className="col-xs-6 col-sm-6">
                    <input className="form-control" onChange={this.filter} value={filterBy} placeholder={'Filter here'} />
                    <button onClick={this.filterResults}>Search</button>
                </div>
                <table className="display-films-tbl table table-striped table-bordered table-hover">
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
                                <tr key={index} onClick={() => this.filmSelected(film)}>
                                    <th scope="row">{film.name}</th>
                                    <td>{film.runtime ? this.getRunTime(film.runtime) : 'No runtime on file,\nusually a sample film'}</td>
                                    <td>{new Date(film.date).toLocaleDateString()}</td>
                                    <td>{new Date(film.watchByDate).toISOString().split('T')[0]}</td>
                                    <td>{film.rating}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {pages}

            </div>
        )
    }
}

DisplayFilms.propTypes = {
    fetchFilms: PropTypes.func.isRequired,
    filmSelected: PropTypes.func.isRequired,
    films: PropTypes.array.isRequired,
    film: PropTypes.object,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

const mapStateToProps = (state) => ({
    films: state.films.films,
    count: state.films.count,
    newFilm: state.films.film
})

export default connect(mapStateToProps, { fetchFilms, filmSelected })(DisplayFilms);