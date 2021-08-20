import React from 'react';
import { Container, Typography } from '@material-ui/core';

import useDefaultLayoutStyles from './useDefaultLayoutStyles';

export const DefaultLayout = ({ children, ...props }) => {
  const classes = useDefaultLayoutStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography
        className={classes.title}
        align="center"
        display="block"
        variant="h4"
      >
        Todo App
      </Typography>
      { children }
    </Container>
  );
}
