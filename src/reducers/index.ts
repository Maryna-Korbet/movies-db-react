import { combineReducers } from 'redux';
import moviesReducer from './movies';

const rootReduser = combineReducers({
    movies: moviesReducer,
});

export default rootReduser;