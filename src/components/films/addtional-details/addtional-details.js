import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import Ratings from 'react-ratings-declarative';
import './additional-details.scss';

class AdditionalDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmInfo: this.props.filmInfo,
            data: {
                additionalNotes: this.props.filmInfo.additionalNotes ? this.props.filmInfo.additionalNotes : '',
                watchByDate: this.props.filmInfo.watchByDate ? new Date(this.props.filmInfo.watchByDate) : new Date()
            }
        }
    }

    onChange = (e) => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
        this.props.updateFilmData({ data: { ...this.state.data, [e.target.name]: e.target.value } });
    }

    getRunTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let ms = mins % 60;
        return `${hours} ${hours === 1 ? 'hour ' : 'hours '} ${ms} mins`
    }

    render() {
        const { filmInfo, data } = this.state;
        const genresOptions = filmInfo.genres.map((g, index) => <option key={index}>{g}</option>)
        console.log(" test ", data.watchByDate);
        return (
            <div className="col-xs-12 col-sm-12">
                <h1>Additional Information for {filmInfo.name}</h1>
                <div className="col-xs-12 col-sm-12 add-cmp-body">
                    <div className="col-xs-6 col-sm-5 container-add-info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12">
                                Rating:
                            </div>
                            <div className="col-xs-12 col-sm-12">
                                <div className="rating">
                                    <Ratings
                                        rating={filmInfo.rating / 2}
                                        widgetRatedColors="rgb(218,165,32)"
                                        widgetHoverColors="rgb(218,165,32)"
                                        changeRating={this.changeRating}
                                    >
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                        <Ratings.Widget widgetDimension="15px" />
                                    </Ratings>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-5 container-add-info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12"> Release Date:  </div>
                            <div className="col-xs-12 col-sm-12">{filmInfo.date}</div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-5 container-add-info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12"> Run Time:  </div>
                            <div className="col-xs-12 col-sm-12">{this.getRunTime(filmInfo.runtime)}</div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-5 container-add-info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12"> Genres  </div>
                            <div className="col-xs-12 col-sm-12">
                                <select size={filmInfo.genres.length} className="form-control select-field">
                                    {genresOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-5 container-add-info large-container-add-info">
                        <div className="row add-details-large-details">
                            <div className="col-xs-12 col-sm-12"> Watch by date:  </div>
                            <div className="col-xs-12 col-sm-12"><DatePicker name="watchByDate" onChange={(e) => this.onChange({ target: { name: 'watchByDate', value: e } })} value={data.watchByDate} minDate={new Date()} /></div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-5 container-add-info large-container-add-info">
                        <div className="row add-details-large-details">
                            <div className="col-xs-12 col-sm-12"> Additional Notes: </div>
                            <div className="col-xs-12 col-sm-12">
                                <textarea className="form-control" name="additionalNotes" onChange={this.onChange} value={data.additionalNotes} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

AdditionalDetailsPage.propTypes = {
    filmInfo: PropTypes.object.isRequired,
    updateFilmData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        filmInfo: state.films.filmInfo
    }
}

export default connect(mapStateToProps)(AdditionalDetailsPage);