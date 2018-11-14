import { LOGIN } from '../actions/types';
import axios from 'axios';
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const login = (user) => (dispatch) =>
    axios.post('http://localhost:5000', { user })
        .then((user) => user.data)
        .then((user) => {
            localStorage.jwt = user.token;
            setAuthorizationHeader(user.token);
            console.log("the user ", JSON.stringify(user))
            return dispatch({
                type: LOGIN,
                payload: user.token
            })
        })

