import 'raf/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { summaryDonations } from '../helpers'
import App from '../components/app'
import { Header } from '../containers/header'
// import { CardList } from '../containers/card_list'
import { updateMessage, toggleAlert, updateTotalDonate, setCharities, showAmounts, selectAmount, fetchFail } from '../actions';
import { UPDATE_MESSAGE, SHOW_ALERT, UPDATE_TOTAL_DONATE, SET_CHARITIES, SHOW_AMOUNTS, SELECT_AMOUNT, FETCH_FAIL } from '../actions';

Enzyme.configure({ adapter: new Adapter() })

describe('helpers', () => {
  test('`summaryDonations` should calculate donations correctly', () => {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
  });
});

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
      expect(wrapperApp.dive().find('div').hasClass('container-fluid text-center')).toBe(true)

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

  // describe('CardList', () => {
  //   it('should render self', () => {
  //     const wrapper = shallow(<CardList />)
  //     console.log(wrapper.debug())
  //   })
  // })

  // describe('Card\'s name', () => {
  //   test('Card component should render the charity\'s name', () => {
  //     const charity = {
  //       id: 1,
  //       name: 'Baan Kru Noi',
  //       image: 'baan-kru-noi.jpg',
  //       currency: 'THB',
  //     }
  //     const wrapper = mount(
  //       <Card key={1} item={charity} i={1} renderModal={() => {}} />
  //     );
  //     const p = wrapper.find('.text-left');
  //     expect(p.text()).toBe('Baan Kru Noi');
  //   });
  // });
})

describe('actions', () => {
  it('should show the alert modal', () => {
    const boolean = true
    const expectedAction = { type: SHOW_ALERT, payload: boolean }
    expect(toggleAlert(boolean)).toEqual(expectedAction)
  })
  it('should update the alert message', () => {
    const message = 'You\'ve just donated 100THB!'
    const expectedAction = { type: UPDATE_MESSAGE, message }
    expect(updateMessage(message)).toEqual(expectedAction)
  })
  it('should update the total donations', () => {
    const amount = 100
    const expectedAction = { type: UPDATE_TOTAL_DONATE, amount }
    expect(updateTotalDonate(amount)).toEqual(expectedAction)
  })
  it('should set the charities', () => {
    const expectedAction = { type: SET_CHARITIES, charities }
    expect(setCharities(charities)).toEqual(expectedAction)
  })
  it('should display the amounts', () => {
    const expectedAction = { type: SHOW_AMOUNTS, amounts }
    expect(showAmounts(amounts)).toEqual(expectedAction)
  })
  it('should select an amount', () => {
    const amount = 100
    const expectedAction = { type: SELECT_AMOUNT, amount }
    expect(selectAmount(amount)).toEqual(expectedAction)
  })
  it('should display an error message', () => {
    const errorMessage = 'Check your internet connection and try again.'
    const expectedAction = { type: FETCH_FAIL, errorMessage }
    expect(fetchFail(errorMessage)).toEqual(expectedAction)
  })
})
