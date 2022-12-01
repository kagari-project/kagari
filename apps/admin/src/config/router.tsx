import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Auth = React.lazy(() => import('../layouts/Auth'));
const Authenticated = React.lazy(() => import('../layouts/Authenticated'));
const UserPage = React.lazy(() => import('../pages/User/User.page'));
const RolePage = React.lazy(() => import('../pages/Role/Role.page'));
// prettier-ignore
const PermissionPage = React.lazy(() => import('../pages/Permission/Permission.page'));
const LoginPage = React.lazy(() => import('../pages/Login.page'));
const ErrorPage = React.lazy(() => import('../pages/Error.page'));
const GalleryPage = React.lazy(() => import('../pages/Gallery/Gallery.page'));

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
      {
        path: 'Gallery',
        children: [
          {
            path: '',
            element: <GalleryPage />,
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
