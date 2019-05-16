import * as types from '../constants/ActionTypes';

export function updateMessage(message) {
  return { type: types.UPDATE_MESSAGE, message }
}

export function toggleAlert(boolean) {
  return { type: types.SHOW_ALERT, payload: boolean };
}

export function updateTotalDonate(amount) {
  return { type: types.UPDATE_TOTAL_DONATE, amount };
}

export function setPayments(payments) {
  return { type: types.SET_PAYMENTS, payments };
}

export function setCharities(charities) {
  return { type: types.SET_CHARITIES, charities };
}

export function showAmounts(amounts) {
  return { type: types.SHOW_AMOUNTS, amounts };
}

export function selectAmount(amount) {
  return { type: types.SELECT_AMOUNT, amount };
}

export function fetchFail(errorMessage) {
  return { type: types.FETCH_FAIL, errorMessage };
}
