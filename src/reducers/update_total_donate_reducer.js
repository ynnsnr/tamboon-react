import { UPDATE_TOTAL_DONATE } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_TOTAL_DONATE:
      return action.amount;
    default: return state;
  }
}
