import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';

describe('App', () => {
  it('renders App correctly', () => {
    const element = shallow(<App />);
    expect(element).toMatchSnapshot();
  });
});
