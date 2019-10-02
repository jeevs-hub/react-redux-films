import { FETCH_FILMS, NEW_FILM, FILM_INFO, FILM_SELECTED } from '../types/film-types';

const initialState = {
    films: [],
    film: {},
    filmInfo: {},
    count: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FILMS:
        return {
            ...state,
            films: action.payload.films,
            count: action.payload.count
        }
        case NEW_FILM:
        return {
            ...state,
            film: action.payload
        }
        case FILM_INFO:
            return {
                ...state,
                filmInfo: action.payload.filmData,
                isEdit: action.payload.isEdit
            }
        case FILM_SELECTED:
            return {
                ...state,
                filmData: action.payload
            }
        default:
            return state;
    }
}