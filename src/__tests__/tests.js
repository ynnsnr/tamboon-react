import 'raf/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { summaryDonations } from '../helpers'
import App from '../components/app'
import { Header } from '../containers/header'

Enzyme.configure({ adapter: new Adapter() })

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
        charities: [{
          id: 1,
          name: 'Baan Kru Noi',
          image: 'baan-kru-noi.jpg',
          currency: 'THB',
        }],
        amounts: [],
      };
      const mockStore = configureStore()
      const store = mockStore(initialState)

      const wrapperApp = shallow(<Provider store={store}><App /></Provider>)
      expect(wrapperApp.dive().find('div').hasClass('container-fluid text-center')).toBe(true)

      const wrapperHeader = wrapperApp.dive({context: {store}}).find('Connect(Header)').dive()
      expect(wrapperHeader.dive().find('h6').text()).toMatch(initialState.donate.toString())

      const wrapperCardList = wrapperApp.dive({context: {store}}).find('Connect(CardList)').dive()
      expect(wrapperCardList.dive().find('div').at(1).hasClass('row no-gutters')).toBe(true)

      const wrapperCard = wrapperCardList.dive().find('Connect(Card)').dive().dive()
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
})
