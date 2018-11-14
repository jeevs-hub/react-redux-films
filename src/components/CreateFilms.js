import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFilm } from '../actions/filmActions';

class CreateFilms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }

        // this.onChange = this.onChange.bind(this);
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const film = {
            title: this.state.title,
            body: this.state.body
        }

        this.props.createFilm(film);
    }

    render() {
        return (
            <div>
                <h1>Add Film</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title: </label><br />
                        <input name="title" type="text" onChange={this.onChange} value={this.state.title} />
                    </div>
                    <br />
                    <div>
                        <label>Body: </label><br />
                        <textarea name="body" onChange={this.onChange} value={this.state.body} />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
};

CreateFilms.propTypes = {
    createFilm: PropTypes.func.isRequired
};

export default connect(null, { createFilm })(CreateFilms);