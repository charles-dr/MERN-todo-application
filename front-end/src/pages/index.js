import React from 'react';

import { DefaultLayout } from '../layouts/DefaultLayout';
import AddTaskForm from '../components/AddTaskForm';

const HomePage = () => {
  return (
    <DefaultLayout>
      <AddTaskForm />

    </DefaultLayout>
  );
}

export default HomePage;
