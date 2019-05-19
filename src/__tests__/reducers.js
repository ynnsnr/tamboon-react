import { charities, amounts, message, errorMessage, payments } from '../constants/testsData';
import * as actions from '../actions';
import * as types from '../constants/ActionTypes';
import reducers from '../reducers';

describe('reducers', () => {
  describe('alertReducer', () => {
    it('should show the alert modal', () => {
      expect(reducers.showAlert(false, actions.toggleAlert(true))).toEqual(true);
    })
  })
  describe('charitiesReducer', () => {
    it('should set the charities', () => {
      expect(reducers.charities([], actions.setCharities(charities))).toEqual(charities);
    })
  })
  describe('fetchFailReducer', () => {
    it('should display an error message', () => {
      expect(reducers.errors([], actions.fetchFail(errorMessage))).toEqual([errorMessage]);
    })
  })
  describe('selectAmountReducer', () => {
    it('should select an amount', () => {
      expect(reducers.selectedAmount(10, actions.selectAmount(100))).toEqual(100);
    })
  })
  describe('showAmountsReducer', () => {
    it('should display the amounts', () => {
      expect(reducers.amounts([], actions.showAmounts(amounts))).toEqual(amounts);
    })
  })
  describe('updateMessageReducer', () => {
    it('should update the alert message', () => {
      expect(reducers.message('', actions.updateMessage(message))).toEqual(message);
    })
  })
  describe('updateTotalDonateReducer', () => {
    it('should update the total donations', () => {
      expect(reducers.donate(1180, actions.updateTotalDonate(1200))).toEqual(1200);
    })
  })
  describe('setPaymentsReducer', () => {
    it('should update the payments', () => {
      expect(reducers.payments([], { type: types.SET_PAYMENTS, payments })).toEqual(payments);
    })
  })
  describe('setLoading', () => {
    it('should show the alert modal', () => {
      expect(reducers.loading(false, actions.setLoading(true))).toEqual(true);
    })
  })
})
