import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { SnackbarProvider } from '@kagari/ui/utils/ProSnackbar';

function App() {
  return (
    <SnackbarProvider
      maxSnack={10}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <RouterProvider router={router}></RouterProvider>
    </SnackbarProvider>
  );
}

export default App;
