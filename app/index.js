import 'babel-polyfill';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './configureStore';
import Home from './components/home/';
import React from 'react';
import ReactDOM from 'react-dom';
import ModuleTester from './module-tester/';

const store = configureStore();
const rootEl = document.getElementById('root');

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    rootEl
  );
}

render();
