import { combineReducers } from 'redux';
import * as reducers from './reducer';

const MainReducer = combineReducers(Object.assign({}, reducers));
export default MainReducer;
