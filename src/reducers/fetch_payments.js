import { FETCH_PAYMENTS } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PAYMENTS: {
      return action.payments ? action.payments : null;
    }
    default:
      return state;
  }
}
