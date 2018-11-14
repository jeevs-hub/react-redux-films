import { LOGIN } from '../actions/types';

const initialState = {
    user: { }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}