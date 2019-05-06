import { SHOW_AMOUNTS } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case SHOW_AMOUNTS:
      return action.amounts;
    default: return state;
  }
}
