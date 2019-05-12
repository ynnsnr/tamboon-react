import 'raf/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { summaryDonations } from '../helpers'
import App from '../components/app'
import { Header } from '../containers/header'
import { CardList } from '../containers/card_list'
import { Card } from '../containers/card'
import * as actions from '../actions'
import * as types from '../constants/ActionTypes'
import reducers from '../reducers'

Enzyme.configure({ adapter: new Adapter() })

const charities = [{
  id: 1,
  name: 'Baan Kru Noi',
  image: 'baan-kru-noi.jpg',
  currency: 'THB',
},{
  id: 2,
  name: 'Habitat for Humanity Thailand',
  image: 'habitat-for-humanity-thailand.jpg',
  currency: 'THB',
}]
const amounts = [10, 20, 50, 100, 500]
const message = 'You\'ve just donated 100THB!'
const errorMessage = 'Check your internet connection and try again.'

jest.spyOn(document, 'querySelector')
  .mockReturnValue({ addEventListener: jest.fn() })

describe('helpers', () => {
  test('`summaryDonations` should calculate donations correctly', () => {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
  });
});

describe('components', () => {
  describe('App', () => {
    it('should render self and subcomponents', () => {
      const initialState = {
        donate: 0,
        charities,
        amounts,
      };
      const mockStore = configureStore()
      const store = mockStore(initialState)

      const wrapperApp = shallow(<Provider store={store}><App /></Provider>)
      expect(wrapperApp.dive().find('div').hasClass('text-center')).toBe(true)

      const wrapperHeader = wrapperApp.dive({context: {store}}).find('Connect(Header)').dive()
      expect(wrapperHeader.dive().find('h6').text()).toMatch(initialState.donate.toString())

      const wrapperCardList = wrapperApp.dive({context: {store}}).find('Connect(CardList)').dive()
      expect(wrapperCardList.dive().find('div').at(1).hasClass('row no-gutters')).toBe(true)

      const wrapperCard = wrapperCardList.dive().find('Connect(Card)').at(0).dive().dive()
      expect(wrapperCard.find('div').at(2).text()).toBe(initialState.charities[0].name)
    })
  })

  describe('Header', () => {
    it('should render self', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper.find('button').hasClass('donations')).toBe(true)
      expect(wrapper.find('h6').text()).toMatch(/DONATIONS/)
    })
  })

  describe('CardList', () => {
    it('should render self', () => {
      const wrapper = shallow(<CardList charities={charities} />)
      expect(wrapper.find('div').at(1).hasClass('row no-gutters')).toBe(true)
    })
  })

  describe('Card', () => {
    test('should render self', () => {
      const wrapper = shallow(
        <Card item={charities[0]} amounts={amounts} />
      );
      expect(wrapper.find('.text-left').text()).toBe(charities[0].name)
    });
  });
})

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

describe('reducers', () => {
  describe('alertReducer', () => {
    it('should show the alert modal', () => {
      expect(reducers.showAlert(false, actions.toggleAlert(true))).toEqual(true)
    })
  })
  describe('charitiesReducer', () => {
    it('should set the charities', () => {
      expect(reducers.charities([], actions.setCharities(charities))).toEqual(charities)
    })
  })
  describe('fetchFailReducer', () => {
    it('should display an error message', () => {
      expect(reducers.errors([], actions.fetchFail(errorMessage))).toEqual([errorMessage])
    })
  })
  describe('selectAmountReducer', () => {
    it('should select an amount', () => {
      expect(reducers.selectedAmount(10, actions.selectAmount(100))).toEqual(100)
    })
  })
  describe('showAmountsReducer', () => {
    it('should display the amounts', () => {
      expect(reducers.amounts([], actions.showAmounts(amounts))).toEqual(amounts)
    })
  })
  describe('updateMessageReducer', () => {
    it('should update the alert message', () => {
      expect(reducers.message('', actions.updateMessage(message))).toEqual(message)
    })
  })
  describe('updateTotalDonateReducer', () => {
    it('should update the total donations', () => {
      expect(reducers.donate(1180, actions.updateTotalDonate(20))).toEqual(1200)
    })
  })
})
