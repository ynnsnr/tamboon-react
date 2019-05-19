import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { charities, amounts, message, errorMessage, payments } from '../constants/testsData';
import * as actions from '../actions';
import * as types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {

  describe('toggleAlert', () => {
    it('should show the alert modal', () => {
      const boolean = true;
      const expectedAction = { type: types.SHOW_ALERT, boolean };
      expect(actions.toggleAlert(boolean)).toEqual(expectedAction);
    })
  })

  describe('updateMessage', () => {
    it('should update the alert message', () => {
      const expectedAction = { type: types.UPDATE_MESSAGE, message };
      expect(actions.updateMessage(message)).toEqual(expectedAction);
    })
  })

  describe('updateTotalDonate', () => {
    it('should update the total donations', () => {
      const amount = 100;
      const expectedAction = { type: types.UPDATE_TOTAL_DONATE, amount };
      expect(actions.updateTotalDonate(amount)).toEqual(expectedAction);
    })
  })

  describe('showAmounts', () => {
    it('should display the amounts', () => {
      const expectedAction = { type: types.SHOW_AMOUNTS, amounts };
      expect(actions.showAmounts(amounts)).toEqual(expectedAction);
    })
  })

  describe('selectAmount', () => {
    it('should select an amount', () => {
      const amount = 100;
      const expectedAction = { type: types.SELECT_AMOUNT, amount };
      expect(actions.selectAmount(amount)).toEqual(expectedAction);
    })
  })

  describe('fetchCharities (async)', () => {
    afterEach(() => { fetchMock.restore() })
    it('should fetch the charities', () => {
      const store = mockStore({});
      const expectedAction = [{ type: types.SET_CHARITIES, charities }];

      fetchMock.get('http://localhost:3001/charities', charities);

      return store.dispatch(actions.fetchCharities()).then((resp) => {
        expect(store.getActions()).toEqual(expectedAction);
      })
    })
  })

  describe('setCharities', () => {
    it('should set the charities', () => {
      const expectedAction = { type: types.SET_CHARITIES, charities };
      expect(actions.setCharities(charities)).toEqual(expectedAction);
    })
  })

  describe('fetchPayments (async)', () => {
    afterEach(() => { fetchMock.restore() })
    it('should fetch the payments', () => {
      const store = mockStore({});
      const expectedAction = [
        { type: types.SET_PAYMENTS, payments },
        { type: types.UPDATE_TOTAL_DONATE, amount: 30 },
      ];

      fetchMock.get('http://localhost:3001/payments', payments);

      return store.dispatch(actions.fetchPayments()).then((resp) => {
        expect(store.getActions()).toEqual(expectedAction);
      })
    })
  })

  describe('setPayments', () => {
    it('should set the payments', () => {
      const expectedAction = { type: types.SET_PAYMENTS, payments };
      expect(actions.setPayments(payments)).toEqual(expectedAction);
    })
  })

  describe('handlePay (async)', () => {
    afterEach(() => { fetchMock.restore() })
    it('should make a payment', () => {
      const amount = 100;
      const payment = { charitiesId: 1, amount, currency: 'THB' };
      const store = mockStore({});
      const expectedAction = [
        { type: types.SET_LOADING, boolean: true },
        { type: types.SET_LOADING, boolean: false },
        { type: types.UPDATE_MESSAGE, message: `You've just donated ${amount}THB to ${charities[0].name}!` },
        { type: types.SHOW_ALERT, boolean: true },
        { type: types.SET_PAYMENTS, payments: payments.concat([payment]) },
        { type: types.UPDATE_TOTAL_DONATE, amount: 130 },
      ];

      fetchMock.post('http://localhost:3001/payments', payment)
        .get('http://localhost:3001/payments', payments.concat([payment]));

      return store.dispatch(actions.handlePay(1, amount, 'THB', charities[0].name))
        .then((resp) => {
          expect(store.getActions()).toEqual(expectedAction);
        })
    })
  })

  describe('fetchFail', () => {
    it('should display an error message', () => {
      const expectedAction = { type: types.FETCH_FAIL, errorMessage };
      expect(actions.fetchFail(errorMessage)).toEqual(expectedAction);
    })
  })

  describe('setLoading', () => {
    it('should set the loading spinner', () => {
      const boolean = true;
      const expectedAction = { type: types.SET_LOADING, boolean };
      expect(actions.setLoading(boolean)).toEqual(expectedAction);
    })
  })

})
