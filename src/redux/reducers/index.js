import { combineReducers } from 'redux';
import filmReducer from './film-reducer';
import userReducer from './user-reducer';


export default combineReducers({
    films: filmReducer,
    user: userReducer
})