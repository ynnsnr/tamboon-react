import { SELECT_AMOUNT } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_AMOUNT:
      return action.amount;
    default: return state;
  }
}
