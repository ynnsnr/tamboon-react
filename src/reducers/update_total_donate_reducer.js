import { UPDATE_TOTAL_DONATE } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_TOTAL_DONATE:
      return state + action.amount;
    default: return state;
  }
}