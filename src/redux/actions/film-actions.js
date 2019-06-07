import { FETCH_FILMS, NEW_FILM, FILM_INFO, FILM_CREATED } from '../types/film-types';
import axios from 'axios';
const url = `https://nodejs-film-service.herokuapp.com/`;

export const fetchFilms = () => (dispatch) =>
    axios.get(url)
        .then((films) => dispatch({
            type: FETCH_FILMS,
            payload: films
        }));

export const getFilmInfo = (filmId) => (dispatch) =>
    axios.get(`${url}search/${filmId}`)
        .then((data) => dispatch({
            type: FILM_INFO,
            payload: data.data
        }))

export const saveFilm = (filmData) => (dispatch) =>
    axios.post(`${url}addFilm`, filmData)
        .then((res) => dispatch({
            type: FILM_CREATED
        }))