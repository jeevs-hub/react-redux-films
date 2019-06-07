import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectFilm from "./select-film/select-film";
import AdditionalDetailsPage from "./addtional-details/addtional-details";
import { saveFilm } from '../../redux/actions/film-actions';
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
            isLoading: false
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
        const { filmInfo } = this.props;
        const film = {
            film_api_id: filmInfo.film_api_key,
            watchByDate: new Date(this.state.data.watchByDate).toISOString().split('T')[0],
            data: {
                name: filmInfo.name,
                rating: filmInfo.rating,
                summary: filmInfo.summary,
                runtime: filmInfo.runtime,
                releaseDate: filmInfo.date,
                genres: filmInfo.genres,
                additionalNotes: this.state.data.additionalNotes,
                photoUrl: filmInfo.imgUrl
            }
        };
        this.props.saveFilm(film)
        .then(() => this.props.history.push('/dashboard'));
    }

    render() {
        const { currentPage, routes } = this.state;
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
                        {currentPage === 0 ? 'Next' : 'Save'}
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
    saveFilm: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        filmInfo: state.films.filmInfo
    }
}

export default connect(mapStateToProps, { saveFilm })(CreateFilm);