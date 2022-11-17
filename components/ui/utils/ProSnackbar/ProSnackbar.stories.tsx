import React from 'react';
import { SnackbarProvider, snackbar } from './ProSnackbar';
import Button from '@mui/material/Button';

export default {
  title: 'ProSnackBar',
  component: SnackbarProvider,
};

export function Default() {
  function onClick() {
    snackbar.toast('custom message');
  }

  return (
    <SnackbarProvider
      maxSnack={10}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Button onClick={onClick}>open</Button>
    </SnackbarProvider>
  );
}
