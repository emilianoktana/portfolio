/**
 * @jest-environment jsdom
 */
import React from 'react'
import { TableRow } from '../components/common/TableRow'

import investmentsData from '../investmentsData'
const items = investmentsData.investments

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<TableRow selected={false} data={items} />).toJSON()
  expect(tree).toMatchSnapshot()
});
