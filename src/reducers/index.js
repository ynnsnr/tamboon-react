import { createStore } from 'redux';

export default createStore((state, action) => {
  const _state = state == null ? {
    donate: 0,
    message: '',
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

    default: return _state;
  }
});
