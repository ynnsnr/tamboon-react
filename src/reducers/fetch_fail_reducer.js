import { FETCH_FAIL } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_FAIL: {
      const copiedState = state.slice(0);
      copiedState.push(action.errorMessage);
      return copiedState;
    }
    default: return state;
  }
}
