import { FETCH_FILMS, NEW_FILM } from '../actions/types';

export const fetchFilms = () => (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((films) => dispatch({
            type: FETCH_FILMS,
            payload: films
        }));
}

export const createFilm = (filmData) => (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(filmData)
    })
    .then((data) => data.json())
    .then((data) => dispatch({
        type: NEW_FILM,
        payload: data
    }))

}