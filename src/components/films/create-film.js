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
        switch (this.state.currentPage) {
            case 0:
                return !!this.props.filmInfo.name;
            default:
                return true;
        }
    }

    saveFilm = () => {
        const { filmInfo, isEdit } = this.props;
        const film = {
            film_api_id: filmInfo.film_api_id,
            watchByDate: new Date(this.state.data.watchByDate).toISOString().split('T')[0],
            filmName: filmInfo.name,
            date: filmInfo.date,
            data: {
                rating: filmInfo.rating,
                summary: filmInfo.summary,
                runtime: filmInfo.runtime,
                genres: filmInfo.genres,
                additionalNotes: this.state.data.additionalNotes,
                photoUrl: filmInfo.imgUrl
            }
        };
        
        if(!isEdit) {
            this.props.saveFilm(film)
            .then(() => this.props.history.push('/dashboard'));
        } else {       
            film.id = filmInfo.id;
            film.additionalNotes = filmInfo.additionalNotes;
            this.props.updateFilm(film)
                .then(() => this.props.history.push('/dashboard'));
        }
    }

    render() {
        const { currentPage, routes } = this.state;
        const { isEdit } = this.props;
        return (
            <div className="component-container col-sm-8">
                <div className="menu-items">
                </div>
                <div className="route-component">
                {routes[currentPage].component}
                </div>
                <div className="footer">
                    <button className="btn btn-primary float-left" disabled={currentPage === 0} onClick={() => this.setState({ ...this.state, currentPage: currentPage - 1 })}>
                        Back
                    </button>
                    <button className="btn btn-primary float-right" disabled={!this.canGoNextPage()} onClick={() => 
                        currentPage === 0 ? this.setState({ ...this.state, currentPage: currentPage + 1 }) :
                        this.saveFilm() }>
                        {currentPage === 0 ? 'Next' : isEdit ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        )
    }
}


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