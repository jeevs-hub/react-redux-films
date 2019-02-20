import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import './add-films.scss';

class AddFilms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            isLoading: false
        }
    }

    displayErrorMessage = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_CENTER
    });

    handleSearch = (query) => {
        this.setState({ isLoading: true });
        axios.get(`https://nodejs-film-service.herokuapp.com/search?q=${encodeURI(query)}`)
            .then(options => this.setState({ ...this.state, options: options.data }))
            .catch((err) => {
                console.error("Error getting films ", err);
                this.displayErrorMessage("Error getting films");
            })
            .finally(this.setState({ ...this.state, isLoading: false }))
    }

    render() {
        return (
            <div className="col-xs-10 col-sm-10 add-film-container">
                    <AsyncTypeahead
                        {...this.state}
                        labelKey="label"
                        minLength={3}
                        onSearch={this.handleSearch}
                        onChange={(e) => this.props.filmSelected(e && e[0] && e[0].id ? e[0].id : null)}
                        placeholder="Search for a film..."
                        renderMenuItemChildren={(option, props) => (
                            <p>{option.label}</p>
                        )}
                    />
            </div>
        )
    }
};

AddFilms.propTypes = {
    filmSelected: PropTypes.func.isRequired
}

export default AddFilms;