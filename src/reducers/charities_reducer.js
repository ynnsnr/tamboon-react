import { SET_CHARITIES } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SET_CHARITIES:
      return action.charities;
    default: return state;
  }
}
