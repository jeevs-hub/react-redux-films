import { FETCH_FILMS, NEW_FILM, FILM_INFO } from '../types/film-types';

const initialState = {
    films: [],
    film: {},
    filmInfo: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FILMS:
        return {
            ...state,
            films: action.payload.data
        }
        case NEW_FILM:
        return {
            ...state,
            film: action.payload
        }
        case FILM_INFO:
        console.log("the film info ", action.payload)
            return {
                ...state,
                filmInfo: action.payload
            }
        // case FILM_CREATED:
        //     return
        default:
            return state;
    }
}