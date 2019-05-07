// external modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// internal modules
import App from './components/App';

// State and reducers
import charitiesReducer from './reducers/charities_reducer';
import updateTotalDonateReducer from './reducers/update_total_donate_reducer';
import updateMessageReducer from './reducers/update_message_reducer';
import alertReducer from './reducers/alert_reducer';
import showAmountsReducer from './reducers/show_amounts_reducer';
import selectAmountReducer from './reducers/select_amount_reducer';
import fetchFailReducer from './reducers/fetch_fail_reducer';

const reducers = combineReducers({
  donate: updateTotalDonateReducer,
  message: updateMessageReducer,
  charities: charitiesReducer,
  amounts: showAmountsReducer,
  selectedAmount: selectAmountReducer,
  showAlert: alertReducer,
  errors: fetchFailReducer,
});

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
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
