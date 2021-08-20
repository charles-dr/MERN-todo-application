import React from 'react'
import { connect } from 'react-redux';
import { Checkbox, Grid, Typography } from '@material-ui/core';

import { updateSubtask } from '../../store/actions';
import useSubtaskStyles from './useSubtaskStyles';

const Subtask = ({ subtask, $updateSubtask }) => {
  const classes = useSubtaskStyles();
  const handleChange = (e) => {
    $updateSubtask(subtask.id, !subtask.status);
  }

  return (
    <>
    <div className={classes.container}>
      <Grid container alignItems="center">
        <Checkbox
          checked={subtask.status}
          color="primary"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>{ subtask.title }</Typography>
      </Grid>
    </div>
    </>
  );
}

const mapState2Props = (state) => ({});
const mapDispatch2Props = {
  $updateSubtask: updateSubtask,
}

export default connect(mapState2Props, mapDispatch2Props)(Subtask);
