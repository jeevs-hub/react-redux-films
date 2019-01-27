import { LOGIN, LOGOUT, REGISTER } from '../types/user-types';
import axios from 'axios';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
const url = 'https://nodejs-film-auth.herokuapp.com/auth/';

export const login = (user) => (dispatch) =>
    axios.post(`${url}login`, user)
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

export const register = (user) => (dispatch) =>
    axios.post(`${url}register`, user)
        .then((user) => user.data)
        .then((user) => {
            localStorage.jwt = user.token;
            setAuthorizationHeader(user.token);
            console.log("the user ", JSON.stringify(user))
            return dispatch({
                type: REGISTER,
                payload: user.token
            })
        })

export const logout = () => (dispatch) =>{
    localStorage.removeItem("jwt");
    setAuthorizationHeader();
    dispatch({ type: LOGOUT });
}
