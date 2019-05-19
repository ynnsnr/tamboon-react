import { SET_LOADING } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.boolean;
    default: return state;
  }
}
