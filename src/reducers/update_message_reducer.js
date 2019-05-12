import { UPDATE_MESSAGE } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return action.message;
    default: return state;
  }
}
