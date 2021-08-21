import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { render, screen } from '../../utils/test-utils';
import AddTaskForm from './index';

test('AddTaskForm', async () => {
  render(<AddTaskForm />);

  expect(screen.getByText(/what to do/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByText(/new list/i)).toBeInTheDocument();
  expect(screen.getByTestId('addTaskForm')).toBeInTheDocument();
});
