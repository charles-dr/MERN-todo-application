import React from 'react';
import renderer from 'react-test-renderer';

// import { shallow } from 'enzyme';

import { DefaultLayout } from './index';

// describe('AddTaskForm', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<AddTaskForm debug />);
//     expect(component).toMatchSnapshot();
//   });
// })

// ref: https://jestjs.io/docs/tutorial-react
test('DefaultLayout', () => {
  const component = renderer.create(<DefaultLayout>Default Layout</DefaultLayout>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
