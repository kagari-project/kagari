import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export default function () {
  return (
    <Stack
      sx={{ height: '100%', width: '100%' }}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress variant={'indeterminate'} size={180} />
    </Stack>
  );
}
