import React, { useState } from 'react'
import { Checkbox, Grid, Typography } from '@material-ui/core';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import useSubtaskStyles from './useSubtaskStyles';

const Subtask = ({ subtask }) => {
  const classes = useSubtaskStyles();
  const [showSubTasks, toggleSubtaskShow] = useState(false);
  const handleChange = (e) => {

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

export default Subtask;
