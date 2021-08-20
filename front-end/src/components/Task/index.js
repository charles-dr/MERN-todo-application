import React from 'react'
import { Checkbox, Container, Grid, Typography } from '@material-ui/core';

import useTaskStyles from './useTaskStyles';

const Task = ({ task }) => {
  const classes = useTaskStyles();
  const handleChange = (e) => {
    const { task } = this.state;
    this.setState({ ...this.state, task: { ...task, status: !task.status } });
  }

  return (
    <div>
      <Grid container alignItems="center">
        <Checkbox
          checked={task.status}
          color="primary"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>{ task.title }</Typography>
      </Grid>
      <div className={classes.completeBar}>
        <Typography>1/5 completed</Typography>
      </div>
    </div>
  );
}

export default Task;
