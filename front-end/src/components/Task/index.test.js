import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { render, screen } from '../../utils/test-utils';
import Task from './index';

test('Task', async () => {
  const task = {
    id: "611f377fe07e47f958cb462e",
    title: "Test Task",
    status: false,
    created_at: "2021-08-20T05:02:55.655Z",
    subtasks: [
      {
        id: "611f9938eb8362137d1564cb",
        title: "Subtask I",
        status: true,
      },
      {
        id: "611f9a03363a86afdc4c77ad",
        title: "Subtask II",
        status: false,
      },
      {
        id: "611f9a4d2b76bcc7d47f2222",
        title: "Subtask III",
        status: true,
      },
    ],
  };
  render(<Task task={task} />);

  // check the elements by text.
  expect(screen.getByText(/test task/i)).toBeInTheDocument();
  task.subtasks.forEach(subtask => {
    expect(screen.getByText(subtask.title)).toBeInTheDocument();
  });

  // addsubtask form
  expect(screen.getByText(/what are the steps/i)).toBeInTheDocument();
  expect(screen.getByText(/new step/i)).toBeInTheDocument();
  expect(screen.getByText(/completed/i)).toBeInTheDocument();

  // check by role.
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getAllByRole('textbox').length).toBe(1);
});
