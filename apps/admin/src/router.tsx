import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Authenticated from './layouts/Authenticated';
import ErrorPage from './pages/Error.page';
import Auth from './layouts/Auth';
import LoginPage from './pages/Login.page';
import UserPage from './pages/User/User.page';
import RolePage from './pages/Role/Role.page';
import PermissionPage from './pages/Permission/Permission.page';

export default createBrowserRouter([
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
        path: 'Users',
        children: [
          {
            path: '',
            element: <UserPage />,
          },
        ],
      },
      {
        path: 'Roles',
        children: [
          {
            path: '',
            element: <RolePage />,
          },
        ],
      },
      {
        path: 'Permissions',
        children: [
          {
            path: '',
            element: <PermissionPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/Auth',
    element: <Auth />,
    children: [
      {
        path: 'Login',
        element: <LoginPage />,
      },
    ],
  },
]);
