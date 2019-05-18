import fetchPaymentsReducer from './fetch_payments';
import charitiesReducer from './charities_reducer';
import updateTotalDonateReducer from './update_total_donate_reducer';
import updateMessageReducer from './update_message_reducer';
import alertReducer from './alert_reducer';
import showAmountsReducer from './show_amounts_reducer';
import selectAmountReducer from './select_amount_reducer';
import fetchFailReducer from './fetch_fail_reducer';

export default {
  donate: updateTotalDonateReducer,
  payments: fetchPaymentsReducer,
  message: updateMessageReducer,
  charities: charitiesReducer,
  amounts: showAmountsReducer,
  selectedAmount: selectAmountReducer,
  showAlert: alertReducer,
  errors: fetchFailReducer,
};
