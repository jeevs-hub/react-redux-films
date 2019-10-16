import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilms, filmSelected } from '../../../redux/actions/film-actions';
import axios from 'axios';

import './display-films.scss';
import { FadeLoader } from 'react-spinners';
const url = `https://nodejs-film-service.herokuapp.com/`;

class DisplayFilms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            previousSortedBy: 'name',
            isAsc: true,
            modalIsOpen: false,
            selectedFilm: null,
            filterBy: '',
            totalPages: 0,
            currentPage: 0,
            count: 0,
            loading: false,
            pageSize: 10
        }
    }

    componentWillMount() {
        console.log("mounts")
        const { filterBy, previousSortedBy, isAsc } = this.state;
        this.props.fetchFilms(0, filterBy, previousSortedBy, isAsc);
    }

    componentWillReceiveProps(nextProps) {
        const { data } = this.state;
        if (data !== nextProps.films) {
            console.log("changed")
            const totalPages = Math.ceil(nextProps.count / this.state.pageSize);
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
        this.props.fetchFilms(currentPage * this.state.pageSize, filterBy, sortBy, isAscending);
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
        this.props.fetchFilms(page * this.state.pageSize, filterBy, previousSortedBy, isAsc);
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
                <li className="page-btn" key="back-all" onClick={() => this.search(0)}>
                    <a href="#">
                        &laquo;
                    </a>
                </li>
            )
            pages.push(
                <li className="page-btn" key="back" onClick={() => this.search(currentPage - 1)}>
                    <a href="#">
                        &lsaquo;
                    </a>
                </li>
            )
        }
        for (let i = start; i < end; i++) {
            pages.push(
                <li className={`page-btn ${currentPage === i ? 'active' : ''}`} key={i} onClick={() => this.search(i)}>
                    {/* <a className="page-link" href="#">{i + 1}</a> */}
                    <a href="#">{i + 1}</a>
                </li>
            );
        }

        if (currentPage < totalPages - 1) {
            pages.push(
                <li className="page-btn" key="forward" onClick={() => this.search(currentPage + 1)}>
                    <a href="#">
                        &rsaquo;
                    </a>
                </li>
            )
            pages.push(
                <li className="page-btn" key="forward-all" onClick={() => this.search(totalPages - 1)}>
                    <a href="#">
                        &raquo;
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

    addRandomFilms = () => {
        this.setState({...this.state, loading: true});

        axios.post(`${url}addDummyData`)
            .then((res) => {
                this.setState({...this.state, currentPage: 0});
                this.props.fetchFilms(0, this.state.filterBy, this.state.previousSortedBy, this.state.isAsc);
            })
            .finally(() => this.setState({...this.state, loading: false}));
    }

    showSortIcon = (sortedCol) => {
        if(this.state.previousSortedBy === sortedCol){
            return this.state.isAsc ? <span>&#11165;</span> : <span>&#11167;</span>;
        }
    }

    render() {

        const { data, filterBy, loading } = this.state;
        // const { firstName } = this.props;
        const pages = this.getPages();
        return (
            <div className="display-center">
                <div className='sweet-loading'>
                    <FadeLoader sizeUnit={"px"} size={25} color={'#123abc'} loading={loading} />
                </div>
                <div className="col-sm-12">
                    {/* <h1>Hi {firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : ''}, view your films</h1> */}
                </div>
                <div className="col-xs-12 col-sm-12 search-container">
                    <input className="form-control col-sm-4" onChange={this.filter} value={filterBy} placeholder={'Filter here'} />
                    <div onClick={this.filterResults}>&#128269;</div>
                    <button className="btn btn-primary" onClick={this.addRandomFilms}>Add Random Films</button>
                </div>
                <table className="display-films-tbl table table-striped table-bordered table-hover">
                    <thead className="table-header">
                        <tr>
                            <th scope="col" onClick={() => this.sortFilms('name')}>Name {this.showSortIcon('name')}</th>
                            <th scope="col" onClick={() => this.sortFilms('runtime')}>Time {this.showSortIcon('runtime')}</th>
                            <th scope="col" onClick={() => this.sortFilms('releaseDate')}>Release Date {this.showSortIcon('releaseDate')}</th>
                            <th scope="col" onClick={() => this.sortFilms('watchByDate')}>Watch By Date {this.showSortIcon('watchByDate')}</th>
                            <th scope="col" onClick={() => this.sortFilms('rating')}>Rating {this.showSortIcon('rating')}</th>
                        </tr>
                    </thead>
                    <tbody className="table-font">
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
    newFilm: state.films.film,
    // firstName: state.user.firstName
})

export default connect(mapStateToProps, { fetchFilms, filmSelected })(DisplayFilms);