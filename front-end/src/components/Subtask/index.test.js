import React from 'react';
import renderer from 'react-test-renderer';

// import { shallow } from 'enzyme';

import Subtask from './index';

// describe('AddTaskForm', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<AddTaskForm debug />);
//     expect(component).toMatchSnapshot();
//   });
// })

// ref: https://jestjs.io/docs/tutorial-react
test('Subtask', () => {
  const subtask = {
    id: '611f9f34e69585e8689633a4',
    task: '611f377fe07e47f958cb462e',
    title: 'Temp subtask',
    status: false,
  };
  const component = renderer.create(<Subtask subtask={subtask} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
