import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { LOGIN } from './redux/types/user-types';
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import store from './store';
import setupAxiosInterceptors from './utils/checkJWT';

setupAxiosInterceptors();

if(localStorage.jwt) {
    setAuthorizationHeader(localStorage.jwt);
    store.dispatch({
        type: LOGIN,
        payload: localStorage.jwt
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
