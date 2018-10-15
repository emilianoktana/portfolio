import 'react-native';
import React from 'react';

import AppNavigation from '../navigation/AppNavigation'

import { Provider } from 'react-redux'
import store from '../store'

import renderer from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = renderer.create(
    <Provider store={store}>
        <AppNavigation />
    </Provider>
    ).toJSON();
  expect(renderer).toBeTruthy()
});