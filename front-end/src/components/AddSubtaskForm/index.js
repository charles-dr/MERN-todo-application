import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from '@material-ui/core';

import { createSubtask } from '../../store/actions';
import useAddSubtaskFormStyles from './useAddSubtaskStyles';


const AddSubtaskForm = ({ taskId, $createSubtask }) => {
  const classes = useAddSubtaskFormStyles();
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    $createSubtask(title, taskId);
    setTitle('');
  }
  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit} data-testid={`addSubtaskForm-${taskId}`}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="flex-end">
          <Grid item xs>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="my-input">What are the steps?</InputLabel>
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
              New Step
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

const mapState2Props = (state) => ({});
const mapDispatch2Props = {
  $createSubtask: createSubtask,
};

export default connect(mapState2Props, mapDispatch2Props)(AddSubtaskForm);
