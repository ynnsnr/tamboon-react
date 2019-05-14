import { charities, amounts, message, errorMessage } from '../constants/testsData'
import * as actions from '../actions'
import * as types from '../constants/ActionTypes'

describe('actions', () => {
  describe('toggleAlert', () => {
    it('should show the alert modal', () => {
      const boolean = true
      const expectedAction = { type: types.SHOW_ALERT, payload: boolean }
      expect(actions.toggleAlert(boolean)).toEqual(expectedAction)
    })
  })
  describe('updateMessage', () => {
    it('should update the alert message', () => {
      const expectedAction = { type: types.UPDATE_MESSAGE, message }
      expect(actions.updateMessage(message)).toEqual(expectedAction)
    })
  })
  describe('updateTotalDonate', () => {
    it('should update the total donations', () => {
      const amount = 100
      const expectedAction = { type: types.UPDATE_TOTAL_DONATE, amount }
      expect(actions.updateTotalDonate(amount)).toEqual(expectedAction)
    })
  })
  describe('setCharities', () => {
    it('should set the charities', () => {
      const expectedAction = { type: types.SET_CHARITIES, charities }
      expect(actions.setCharities(charities)).toEqual(expectedAction)
    })
  })
  describe('showAmounts', () => {
    it('should display the amounts', () => {
      const expectedAction = { type: types.SHOW_AMOUNTS, amounts }
      expect(actions.showAmounts(amounts)).toEqual(expectedAction)
    })
  })
  describe('selectAmount', () => {
    it('should select an amount', () => {
      const amount = 100
      const expectedAction = { type: types.SELECT_AMOUNT, amount }
      expect(actions.selectAmount(amount)).toEqual(expectedAction)
    })
  })
  describe('fetchFail', () => {
    it('should display an error message', () => {
      const expectedAction = { type: types.FETCH_FAIL, errorMessage }
      expect(actions.fetchFail(errorMessage)).toEqual(expectedAction)
    })
  })
})
