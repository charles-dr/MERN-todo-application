import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AddTaskForm from './index';

afterEach(cleanup);


// test('form has an input element', () => {
//   const component = renderer.create(<AddTaskForm />);
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

