import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { render, screen } from '../../utils/test-utils';
import AddSubtaskForm from './index';

test('AddSubtaskForm', async () => {
  const taskId = "611f9f34e69585e8689633a4";
  render(<AddSubtaskForm taskId={taskId} />);

  expect(screen.getByText(/what are the steps/i)).toBeInTheDocument();
  expect(screen.getByText(/new step/i)).toBeInTheDocument();

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  
  expect(screen.getByTestId(`addSubtaskForm-${taskId}`)).toBeInTheDocument();
});
