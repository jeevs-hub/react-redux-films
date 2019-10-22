import { LOGIN, LOGOUT } from '../types/user-types';
import axios from 'axios';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
const url = 'https://nodejs-film-auth.herokuapp.com/auth/';

const unauthorisedAxiosReq = axios.create();

export const login = (user) => (dispatch) =>
    unauthorisedAxiosReq.post(`${url}login`, user)
        .then((user) => user.data)
        .then((user) => {
            localStorage.jwt = user.token;
            setAuthorizationHeader(user.token);
            return dispatch({
                type: LOGIN,
                payload: user.token
            })
        })

export const register = (user) => (dispatch) =>
    unauthorisedAxiosReq.post(`${url}register`, user)
        .then((user) => user.data)
        .then((user) => {
            localStorage.jwt = user.token;
            setAuthorizationHeader(user.token);
            return dispatch({
                type: LOGIN,
                payload: user.token
            })
        })

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    setAuthorizationHeader();
    dispatch({ type: LOGOUT });
}
