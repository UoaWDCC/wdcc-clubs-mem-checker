import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home/home';
import ClubDetailPage from './pages/club-detail-page/ClubDetailPage';
import { GoogleSignIn } from './pages/google-sign-in/GoogleSignInPage';
import NoClubs from './pages/no-clubs/NoClubs';
import Dashboard from './pages/dashboard/Dashboard';
import GoogleCallback from './pages/google-callback/GoogleCallback';
import axios from 'axios';
import Cookies from 'js-cookie';
import InviteCodePage from './pages/invite-code/InviteCodePage';
import { ConfimationPage } from './pages/onboarding-confirmation-page/ConfirmationPage';
import PublicCheckerPage from './pages/public-checker-page/PublicCheckerPage';
import OurTeam from './pages/our-team/OurTeam';
import EditCheckerPage from './pages/create-checker-page/EditCheckerPage';
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/our-team',
    element: <OurTeam />,
  },
  {
    path: '/create-page',
    element: <EditCheckerPage isEdit={false} />,
  },
  {
    path: '/edit/:webLinkId',
    element: <EditCheckerPage isEdit={true} />,
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
  {
    path: '/club-details',
    element: <ClubDetailPage />,
  },
  {
    path: '/invite-code',
    element: <InviteCodePage />,
  },
  {
    path: '/confirmation',
    element: <ConfimationPage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/:webLinkId',
    element: <PublicCheckerPage />,
  },
]);

// Find the auth token in local storage if it exists

if (import.meta.env.MODE == 'production') {
  axios.defaults.baseURL = '/api/';
} else {
  axios.defaults.baseURL = 'http://localhost:3000/api/';
}

function hasClubs(): boolean {
  axios
    .get('/user/organisations')
    .then((res) => {
      if (res.status === 204) {
        return true;
      }
    })
    .catch(() => false);
  return false;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
