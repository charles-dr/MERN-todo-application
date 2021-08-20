import React from 'react';

import * as api from '../api';
import { DefaultLayout } from '../layouts/DefaultLayout';
import AddTaskForm from '../components/AddTaskForm';
import Task from '../components/Task';

class HomePage extends React.Component {
  state = {
    tasks: [],
  };
  constructor(props) {
    super();
    // this.state = {
    //   tasks: [],
    // };
  }
  componentDidMount() {
    console.log('[HomePage]');
    this.loadTasks();
    this.createTask();
  }
  loadTasks() {
    return api.getTasks()
      .then(data => {
        console.log('[Tasks] Loaded.', data);
        this.setState({ ...this.state, tasks: data });
      })
  }
  createTask() {
    const title = Date.now().toString();
    const jsonapi = api.createTask(title);
    console.log('[json api]', jsonapi);
  }
  render() {
    return (
      <DefaultLayout>
        <AddTaskForm />
        {
          this.state.tasks.length > 0 && this.state.tasks.map((task, i) => (
            <Task task={task} key={i} />
          ))
        }
      </DefaultLayout>
    );    
  }

}

export default HomePage;
