import 'raf/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import App from '../components/app'
import { Header } from '../containers/header'
import CardList from '../containers/card_list'
import { Card } from '../containers/card'
import { charities, amounts } from '../constants/testsData'

Enzyme.configure({ adapter: new Adapter() })

const initialState = { donate: 0, charities, amounts }
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore(initialState)

jest.spyOn(document, 'querySelector')
  .mockReturnValue({ addEventListener: jest.fn() })

describe('components', () => {
  describe('App', () => {
    it('should render self and subcomponents', () => {
      const wrapperApp = shallow(<Provider store={store}><App /></Provider>)
      expect(wrapperApp.dive().find('div').hasClass('text-center')).toBe(true)

      const wrapperHeader = wrapperApp.dive({context: {store}}).find('Connect(Header)').dive()
      expect(wrapperHeader.dive().find('h6').text()).toMatch(initialState.donate.toString())

      const wrapperCardList = wrapperApp.dive({context: {store}}).find('Connect(CardList)').dive()
      expect(wrapperCardList.dive().find('div').at(1).hasClass('row no-gutters')).toBe(true)

      const wrapperCard = wrapperCardList.dive().find('Connect(Card)').at(0).dive().dive()
      expect(wrapperCard.find('div.text-left').text()).toBe(initialState.charities[0].name)
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
      const wrapper = shallow((<Provider store={store}><CardList charities={charities} /></Provider>))
      expect(wrapper.dive({context: {store}}).dive().find('div').at(1).hasClass('row no-gutters')).toBe(true)
    })
  })

  describe('Card', () => {
    test('should render self', () => {
      const wrapper = shallow(<Card item={charities[0]} amounts={amounts} />);
      expect(wrapper.find('.text-left').text()).toBe(charities[0].name)
    });
  });
})
