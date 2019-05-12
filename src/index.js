// external modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// internal modules
import App from './components/App';

// State and reducers
import reducers from './reducers';

const combinedReducers = combineReducers(reducers);

const initialState = {
  donate: 0,
  message: '',
  charities: [],
  amounts: [],
  selectedAmount: 0,
  showAlert: false,
  errors: [],
};

const store = createStore(
  combinedReducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
