import { combineReducers } from 'redux';
import userReducers from './user';
import classReducers from './class';
import schoolReducers from './school';

export default combineReducers({ userReducers, classReducers, schoolReducers });
