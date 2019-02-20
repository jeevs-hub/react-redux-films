import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AdditionalDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmInfo: null
        }
    }

    componentDidMount() {
        this.setState({...this.state, filmInfo: this.props.filmInfo });
    }

    componentWillReceiveProps(nextProps) {
            console.log("sets it in the state");
          this.setState({...this.state, filmInfo: nextProps.filmInfo });
    }

    render() {
        const { filmInfo } = this.state;
        console.log("the select film ", filmInfo)
        return (
            <div className="col-xs-12 col-sm-12">
                <h1>pounfs</h1>
                <button onClick={() => console.log("test ", this.state.filmInfo)}>Test</button>
            </div>
        )
    }
};

AdditionalDetailsPage.propTypes = {
    filmInfo: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        filmInfo: state.films.filmInfo
    }
}

export default connect(mapStateToProps)(AdditionalDetailsPage);