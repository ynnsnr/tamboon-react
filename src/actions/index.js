import * as types from '../constants/ActionTypes';
import { summaryDonations } from '../helpers';

export function fetchPayments() {
  return (dispatch) => {
    const promise = fetch('http://localhost:3001/payments')
      .then(resp => resp.json())
      .then(payments => dispatch({ type: types.FETCH_PAYMENTS, payments }))
      .catch(() => {
        dispatch(fetchFail('Check your internet connection and try again.'));
      });
    promise.then((action) => {
      if (action) {
        dispatch(updateTotalDonate(summaryDonations(action.payments.map(x => x.amount))));
      }
    });
    return promise;
  }
}

export function updateMessage(message) {
  return { type: types.UPDATE_MESSAGE, message }
}

export function toggleAlert(boolean) {
  return { type: types.SHOW_ALERT, payload: boolean };
}

export function updateTotalDonate(amount) {
  return { type: types.UPDATE_TOTAL_DONATE, amount };
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
