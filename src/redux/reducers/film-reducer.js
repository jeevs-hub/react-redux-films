import { FETCH_FILMS, NEW_FILM } from '../types/film-types';

const initialState = {
    films: [],
    film: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FILMS:
            return {
                ...state,
                films: action.payload
            }
        case NEW_FILM:
            return {
                ...state,
                film: action.payload
            }
        default:
            return state;
    }
}