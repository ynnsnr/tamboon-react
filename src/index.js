// external modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// internal modules
import App from './components/App';

// State and reducers
import reducers from './reducers';

render(
  <Provider store={reducers}>
    <App />
  </Provider>,
  document.getElementById('root')
);
