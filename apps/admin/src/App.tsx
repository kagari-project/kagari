import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Authenticated from './layouts/Authenticated';
import ErrorPage from './pages/Error.page';
import Auth from './layouts/Auth';
import LoginPage from './pages/Login.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Authenticated />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <>home</>,
      },
      {
        path: 'contracts/:contractId',
        element: <>foobar</>,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <>register</>,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}

export default App;
