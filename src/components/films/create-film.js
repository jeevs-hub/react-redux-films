import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectFilm from "./select-film/select-film";
import AdditionalDetailsPage from "./addtional-details/addtional-details";
// import './select-film.scss';

const Sandwiches = () => <h2>Sandwiches</h2>;
const Sandwiches1 = () => <h2>isfbios</h2>;

class CreateFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            routes: [
                {
                    label: "/select",
                    component: <SelectFilm></SelectFilm>
                },
                {
                    label: "",
                    component: <AdditionalDetailsPage></AdditionalDetailsPage>
                },
                {
                    label: "Sandwhiches 1",
                    component: <Sandwiches1></Sandwiches1>
                }
            ],
            isLoading: false
        }
    }
    
    canGoNextPage = () => {
        switch(this.state.currentPage) {
            case 0:
                return !this.props.filmInfo;
            default:
                return !false;
        }
    }

    render() {
        const { currentPage, routes } = this.state;
        return (
            
            <div>
                <div className="menu-items">
                </div>
                {routes[currentPage].component}
                <div className="footer">
                    <button disabled={this.canGoNextPage()} onClick={() => this.setState({...this.state, currentPage: currentPage + 1})}>
                        Next
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
    filmInfo: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        filmInfo: !!state.films.filmInfo.name
    }
}

export default connect(mapStateToProps, {})(CreateFilm);