import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import { updateTask } from '../../store/actions';
import Subtask from '../Subtask';
import AddSubtaskForm from '../AddSubtaskForm';
import useTaskStyles from './useTaskStyles';

const Task = ({ task, $updateTask }) => {
  const classes = useTaskStyles();
  const [showSubTasks, toggleSubtaskShow] = useState(false);
  const handleChange = (e) => {
    $updateTask(task.id, !task.status);
  }

  return (
    <>
    <div className={classes.container}>
      <Grid container alignItems="center">
        <Checkbox
          checked={task.status}
          color="primary"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>{ task.title }</Typography>
      </Grid>
      <div className={classes.completeBar} onClick={() => toggleSubtaskShow(!showSubTasks)}>
        <Typography>{task.subtasks.filter(it => it.status).length}/{task.subtasks.length} completed</Typography>
        {showSubTasks ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}

      </div>
    </div>
    <div className={classes.subtasksContainer}
      style={{
        height: showSubTasks ? '' : '0',
        overflow: 'hidden',
      }}>
      {
        task.subtasks.length > 0 && task.subtasks.map((subtask, i) => (
          <Subtask subtask={subtask} key={i} />
        ))
      }
      <AddSubtaskForm />
    </div>
    </>
  );
}

const mapState2Props = (state) => ({});
const mapDispatch2Props = {
  $updateTask: updateTask,
};

export default connect(mapState2Props, mapDispatch2Props)(Task);
