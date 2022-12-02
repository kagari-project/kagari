import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import { SnackbarProvider } from '@kagari/ui/utils/ProSnackbar';
import Loading from './components/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SnackbarProvider
        maxSnack={10}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <RouterProvider router={router}></RouterProvider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
