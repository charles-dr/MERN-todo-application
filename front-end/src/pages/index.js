import React from 'react';
import { connect } from 'react-redux';

import { loadTasks } from '../store/actions';
import { DefaultLayout } from '../layouts/DefaultLayout';
import AddTaskForm from '../components/AddTaskForm';
import Task from '../components/Task';

const HomePage = ({ tasks, $loadTasks }) => {
  React.useEffect(() => {
    $loadTasks();
    return () => {}
  // eslint-disable-next-line
  }, []);
  return (
    <DefaultLayout>
      <AddTaskForm />
      {
        tasks.length > 0 && tasks.map((task, i) => (
          <Task task={task} key={i} />
        ))
      }
    </DefaultLayout>
  );
}

const mapState2Props = ({ task }) => ({ tasks: task.tasks });
const mapDispatch2Props = {
  $loadTasks: loadTasks,
};

export default connect(mapState2Props, mapDispatch2Props)(HomePage);
