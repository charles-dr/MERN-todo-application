// ref: https://redux.js.org/usage/writing-tests#example-1
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { render, screen } from '../../utils/test-utils';
import Subtask from './index';



test('Subtask', async () => {
  const subtask = {
    id: '611f9f34e69585e8689633a4',
    task: '611f377fe07e47f958cb462e',
    title: 'Temp subtask',
    status: false,
  };
  render(<Subtask subtask={subtask} />);

  expect(screen.getByText(/temp subtask/i)).toBeInTheDocument();
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
