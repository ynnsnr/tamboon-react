import { SET_PAYMENTS } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SET_PAYMENTS: {
      return action.payments;
    }
    default:
      return state;
  }
}
