import { LOGIN, LOGOUT } from '../types/user-types';
import { decodeJwt } from '../../utils/decodeJWT';

const initialState = {
    user: { }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { firstName: decodeJwt(action.payload).firstName }
        case LOGOUT:
            return {}
        default:
            return state;
    }
}
