// external modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// internal modules
import App from './components/App';

// State and reducers
import reducers from './reducers';

const combinedReducers = combineReducers(reducers);
const initialState = {
  donate: 0,
  message: '',
  charities: [],
  payments: [],
  amounts: [],
  selectedAmount: 0,
  showAlert: false,
  errors: [],
  loading: false,
};

// Middlewares
const middlewares = applyMiddleware(thunk);

const store = createStore(
  combinedReducers,
  initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middlewares,
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
