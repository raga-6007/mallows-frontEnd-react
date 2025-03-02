// src/reducers/index.js
import { combineReducers } from 'redux';
import { userPageReducer } from './user/userPageReducer';

const rootReducer = combineReducers({
  userPage: userPageReducer,
});

export default rootReducer;
