import { combineReducers } from 'redux';
import postsReducer from './exampleReducer';

export default combineReducers({
    posts: postsReducer
})