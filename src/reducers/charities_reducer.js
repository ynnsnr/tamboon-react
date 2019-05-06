import { SET_CHARITIES } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case SET_CHARITIES:
      return action.charities;
    default: return state;
  }
}
