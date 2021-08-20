import React from 'react';
import { Container } from '@material-ui/core';

export const DefaultLayout = ({ children, ...props }) => {
  return (
    <Container maxWidth="md">
      { children }
    </Container>;
  );
}
