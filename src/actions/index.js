export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const SHOW_ALERT = 'SHOW_ALERT';
export const UPDATE_TOTAL_DONATE = 'UPDATE_TOTAL_DONATE';
export const SET_CHARITIES = 'SET_CHARITIES';
export const SHOW_AMOUNTS = 'SHOW_AMOUNTS';
export const SELECT_AMOUNT = 'SELECT_AMOUNT';
export const FETCH_FAIL = 'FETCH_FAIL';

export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message }
}

export function toggleAlert(boolean) {
  return { type: SHOW_ALERT, payload: boolean };
}

export function updateTotalDonate(amount) {
  return { type: UPDATE_TOTAL_DONATE, amount };
}

export function setCharities(charities) {
  return { type: SET_CHARITIES, charities };
}

export function showAmounts(amounts) {
  return { type: SHOW_AMOUNTS, amounts };
}

export function selectAmount(amount) {
  return { type: SELECT_AMOUNT, amount };
}

export function fetchFail(errorMessage) {
  return { type: FETCH_FAIL, errorMessage };
}
