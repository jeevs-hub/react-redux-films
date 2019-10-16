import { FETCH_FILMS, NEW_FILM, FILM_INFO, FILM_CREATED, FILM_SELECTED } from '../types/film-types';
import axios from 'axios';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';
const url = `https://nodejs-film-service.herokuapp.com/`;

export const fetchFilms = (offset, filter, orderBy, asc) => (dispatch) =>
    axios.get(`${url}?offset=${offset}&limit=${10}&filter=${filter}&order=${orderBy}&orderAsc=${asc}`)
        .then((data) => data.data)
        .catch((x) =>  {
            if(x.response.data.message === "Error validating token") {
                console.log("logout triggered")
                localStorage.removeItem("jwt");
                setAuthorizationHeader();            
            }
        })
        .then((films) => {
            if (films && films.data) {
                return dispatch({
                    type: FETCH_FILMS,
                    payload: { films: films.data, count: films.count }
                })
            }
        });

export const getFilmInfo = (filmId) => (dispatch) =>
    axios.get(`${url}search/${filmId}`)
        .then((data) => dispatch({
            type: FILM_INFO,
            payload: { filmData: data.data, isEdit: false }
        }))

export const saveFilm = (filmData) => (dispatch) =>
    axios.post(`${url}addFilm`, filmData)
        .then((res) => dispatch({
            type: FILM_CREATED
        }))

export const filmSelected = (filmData, isEdit = false) => (dispatch) =>
    dispatch({
        type: FILM_INFO,
        payload: { filmData, isEdit }
    })

export const updateFilm = (filmData) => (dispatch) =>
    axios.put(`${url}updateFilm`, filmData)