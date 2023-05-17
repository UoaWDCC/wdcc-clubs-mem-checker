import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home/home';
import { ExamplePage } from './pages/example/page';
import CreateCheckerPage from './components/create-checker-page/CreateCheckerPage';
import { GoogleSignIn } from './pages/google-sign-in/GoogleSignInPage';
import NoClubs from './pages/no-clubs/NoClubs';
import Dashboard from './pages/dashboard/Dashboard';
import GoogleCallback from './pages/google-callback/GoogleCallback';
import axios from 'axios';
import Cookies from 'js-cookie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/example',
    element: <ExamplePage />,
  },
  {
    path: '/create-page',
    element: <CreateCheckerPage />,
  },
  {
    path: '/sign-in',
    element: <GoogleSignIn />,
  },
  {
    path: '/no-clubs',
    element: <NoClubs />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/auth/google/callback',
    element: <GoogleCallback />,
  },
]);

// Find the auth token in local storage if it exists
const token: string | undefined = Cookies.get('token');
if (token != undefined) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
