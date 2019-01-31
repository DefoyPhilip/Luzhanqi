import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage'
import 'material-design-icons/iconfont/material-icons.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MainReducer from './reducers/MainReducer';

const enhancer = compose(
  persistState(['user']),
)

const store = createStore(MainReducer, {}, enhancer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
