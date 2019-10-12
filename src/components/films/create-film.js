import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectFilm from "./select-film/select-film";
import AdditionalDetailsPage from "./addtional-details/addtional-details";
import { saveFilm, updateFilm } from '../../redux/actions/film-actions';
import './create-film.scss';

class CreateFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            routes: [
                {
                    label: "Select",
                    component: <SelectFilm></SelectFilm>
                },
                {
                    label: "Additional Details",
                    component: <AdditionalDetailsPage updateFilmData={this.filmDataUpdated}></AdditionalDetailsPage>
                }
            ],
            data: {
                additionalNotes: '',
                watchByDate: new Date()
            },
            isLoading: false,
        }
    }

    filmDataUpdated = (newData) => {
        this.setState({ data: newData.data })
    };

    canGoNextPage = () => {
        return this.state.currentPage === 0 && !!this.props.filmInfo.name;
    }

    saveFilm = () => {
        const { filmInfo, isEdit } = this.props;
        const film = {
            film_api_id: filmInfo.film_api_id,
            watchByDate: new Date(this.state.data.watchByDate).toISOString().split('T')[0],
            filmName: filmInfo.name,
            date: filmInfo.date,
            rating: filmInfo.rating,
            data: {
                summary: filmInfo.summary,
                runtime: filmInfo.runtime,
                genres: filmInfo.genres,
                additionalNotes: this.state.data.additionalNotes,
                photoUrl: filmInfo.imgUrl
            }
        };

        if (!isEdit) {
            this.props.saveFilm(film)
                .then(() => this.props.history.push('/dashboard'));
        } else {
            film.id = filmInfo.id;
            film.additionalNotes = filmInfo.additionalNotes;
            this.props.updateFilm(film)
                .then(() => this.props.history.push('/dashboard'));
        }
    }

    getForwardArrow = () => (
        <div className={`previous-next-btns next ${!this.canGoNextPage() && 'disabled-cursor-btns'}`} onClick={this.goNext} >
            <svg width="35" height="70" viewBox="0 0 35 70">
                <g transform="translate(-1305 -331)">
                    <rect width="35" height="70" transform="translate(1305 331)" fill="#373737"></rect>
                    <path d="M1312.244,304.8l7.318-14.926-7.318-14.926" transform="translate(7 76)" fill="none" stroke="#afafaf">
                    </path>
                </g>
            </svg>
        </div>
    )

    getBackArrow = () => (
        <div className={`previous-next-btns previous ${this.state.currentPage === 0 && 'disabled-cursor-btns'}`} onClick={this.goPrevious}>
            <svg width="35" height="70" viewBox="0 0 35 70">
                <g transform="translate(1341 401) rotate(180)">
                    <rect width="35" height="70" transform="translate(1306 331)" fill="#373737">
                    </rect>
                    <path d="M1312.244,304.8l7.318-14.926-7.318-14.926" transform="translate(7 76)" fill="none" stroke="#afafaf">
                    </path>
                </g>
            </svg>
        </div>
    )

    goNext = () => {
        if (this.state.currentPage === 0 && this.canGoNextPage()) {
            this.setState({ ...this.state, currentPage: this.state.currentPage + 1 })
        }
    }

    goPrevious = () => {
        if (this.state.currentPage !== 0) {
            this.setState({ ...this.state, currentPage: this.state.currentPage - 1 })
        }
    }

    render() {
        const { currentPage, routes } = this.state;
        return (
            <div className="col-sm-12 col-md-12 create-film-container">
                <div className="col-sm-2 back-arrow-container">
                    {this.getBackArrow()}
                </div>
                <div className="component-container col-sm-8 col-md-8">
                    <div className="route-component">
                        {routes[currentPage].component}
                    </div>
                </div >
                <div className="col-sm-2 next-arrow-container">
                    {this.getForwardArrow()}
                </div>
                <div className="col-sm-10 col-md-10 footer">
                    <button className="btn btn-primary float-right" disabled={!this.canGoNextPage()} >
                        Save
                    </button>
                </div>
            </div>
        )
    }
}
{/* <div className="footer">
                    <button className="btn btn-primary float-left" disabled={currentPage === 0} onClick={() => this.setState({ ...this.state, currentPage: currentPage - 1 })}>
                        Back
                    </button>
                    <button className="btn btn-primary float-right" disabled={!this.canGoNextPage()} onClick={() =>
                        currentPage === 0 ? this.setState({ ...this.state, currentPage: currentPage + 1 }) :
                            this.saveFilm()}>
                        {currentPage === 0 ? 'Next' : isEdit ? 'Update' : 'Save'}
                    </button>
                </div> */}

CreateFilm.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    filmInfo: PropTypes.any.isRequired,
    saveFilm: PropTypes.func.isRequired,
    updateFilm: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        filmInfo: state.films.filmInfo,
        isEdit: state.films.isEdit
    }
}

export default connect(mapStateToProps, { saveFilm, updateFilm })(CreateFilm);