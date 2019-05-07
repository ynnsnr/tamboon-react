import 'raf/polyfill';
import { summaryDonations } from '../helpers';
// import React from 'react';
// import Card from '../containers/card';
import Enzyme from 'enzyme'
// import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('helpers', () => {
  test('`summaryDonations` should calculate donations correctly', () => {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
  });
});

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
