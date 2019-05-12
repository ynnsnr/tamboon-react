import { SHOW_ALERT } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return action.payload;
    default: return state;
  }
}
