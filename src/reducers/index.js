import { createStore } from 'redux';

export default createStore((state, action) => {
  const _state = state == null ? {
    donate: 0,
    message: '',
    charities: [],
    amounts: [],
    selectedAmount: 0,
    showAlert: false,
  } : state;

  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return Object.assign({}, _state, {
        donate: _state.donate + action.amount,
      });
    case 'UPDATE_MESSAGE':
      return Object.assign({}, _state, {
        message: action.message,
      });
    case 'SET_CHARITIES':
      return Object.assign({}, _state, {
        charities: action.charities,
      });
    case 'SET_AMOUNTS':
      return Object.assign({}, _state, {
        amounts: action.amounts,
      });
    case 'SELECT_AMOUNT':
      return Object.assign({}, _state, {
        selectedAmount: action.amount,
      })
    case 'SHOW_ALERT':
      return Object.assign({}, _state, {
        showAlert: true,
      })
    case 'HIDE_ALERT':
      return Object.assign({}, _state, {
        showAlert: false,
      })

    default: return _state;
  }
});
