import { LOGIN, LOGOUT } from '../types/user-types';

const initialState = {
    user: { }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { token: action.payload }
        case LOGOUT:
            return { token: action.payload }
        default:
            return state;
    }
}