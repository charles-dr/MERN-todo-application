import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FormControl,
  // FormHelperText,
  Grid,
  Input,
  InputLabel,
} from '@material-ui/core';

import { createTask } from '../../store/actions'


const AddTaskForm = ({ $createTask }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    $createTask(title);
    setTitle('');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="my-input">What to do?</InputLabel>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                required={true}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              fullWidth={true}
              color="primary"
              size="medium"
              variant="outlined"
            >
              New List
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

const mapState2Props = (state) => ({});
const mapDispatch2Props = {
  $createTask: createTask,
}

export default connect(mapState2Props, mapDispatch2Props)(AddTaskForm);
