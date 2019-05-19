import * as types from '../constants/ActionTypes';
import { summaryDonations } from '../helpers';

const errorMessage = 'Check your internet connection and try again.';

export function fetchCharities() {
  return (dispatch) => {
    const promise = fetch('http://localhost:3001/charities')
      .then(resp => resp.json())
      .then(data => {
        dispatch(setCharities(data));
      })
      .catch(() => {
        dispatch(fetchFail(errorMessage));
      });
    promise.then((action) => {
      if (action) {
        action.forEach(element => element.modal = false);
      }
    })
    return promise;
  }
}

export function fetchPayments() {
  return (dispatch) => {
    return fetch('http://localhost:3001/payments')
      .then(resp => resp.json())
      .then(payments => dispatch(setPayments(payments)))
      .then((action) => {
        dispatch(updateTotalDonate(summaryDonations(action.payments.map(x => x.amount))));
      })
      .catch(() => {
        dispatch(fetchFail(errorMessage));
      });
  }
}

export function handlePay(id, amount, currency, name) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => { return resp.json() })
      .then((data) => {
        dispatch(setLoading(false));
        dispatch(updateMessage(`You've just donated ${amount}THB to ${name}!`));
        dispatch(toggleAlert(true));
        return dispatch(fetchPayments());
      }).catch(() => {
        dispatch(fetchFail('Payment could not be processed. Please try again.'));
      });
  }
}

export function updateMessage(message) {
  return { type: types.UPDATE_MESSAGE, message }
}

export function toggleAlert(boolean) {
  return { type: types.SHOW_ALERT, boolean };
}

export function updateTotalDonate(amount) {
  return { type: types.UPDATE_TOTAL_DONATE, amount };
}

export function setCharities(charities) {
  return { type: types.SET_CHARITIES, charities };
}

export function setPayments(payments) {
  return { type: types.SET_PAYMENTS, payments };
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

export function setLoading(boolean) {
  return { type: types.SET_LOADING, boolean };
}
