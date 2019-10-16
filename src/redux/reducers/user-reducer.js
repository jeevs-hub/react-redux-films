import { LOGIN, LOGOUT } from '../types/user-types';

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


const decodeJwt = (jwt) => {
    const base64Url = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer(base64Url, 'base64');
    const payloadinit = buff.toString('ascii');
    return JSON.parse(payloadinit);
}