import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { HomePage } from "./pages/home/home";
import { ExamplePage } from "./pages/example/page";
import CreateCheckerPage from "./pages/create-checker-page/CreateCheckerPage";
import ClubDetailPage from "./pages/club-detail-page/ClubDetailPage";
import { GoogleSignIn } from "./pages/google-sign-in/GoogleSignInPage";
import NoClubs from "./pages/no-clubs/NoClubs";
import Dashboard from "./pages/dashboard/Dashboard";
import GoogleCallback from "./pages/google-callback/GoogleCallback";
import axios from "axios";
import Cookies from "js-cookie";
import InviteCodePage from "./pages/invite-code/InviteCodePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { ConfimationPage } from "./pages/onboarding-confirmation-page/ConfirmationPage";
import ClubCheckerPage from "./pages/club-checker-page/ClubCheckerPage";
import EmptyClubLogo from "./assets/EmptyClubLogo.svg";
import hasClubs from "./utils/navigationHelpers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/example",
    element: <ExamplePage />,
  },
  {
    path: "/create-page",
    element: <CreateCheckerPage />,
  },
  {
    path: "/sign-in",
    element: <GoogleSignIn />,
  },
  {
    path: "/no-clubs",
    element: hasClubs() ? <Navigate to="/dashboard" /> : <NoClubs />,
  },
  {
    path: "/dashboard",
    element: hasClubs() ? <Dashboard /> : <Navigate to="/no-clubs" />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleCallback />,
  },
  {
    path: "/club-details",
    element: <ClubDetailPage />,
  },
  {
    path: "/invite-code",
    element: <InviteCodePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/confirmation",
    element: <ConfimationPage />,
  },
  {
    path: "/checker-page/:webLinkID",
    element: (
      // example props
      <div style={{ width: "100vw", height: "100%" }}>
        <ClubCheckerPage
          clubId={1}
          clubName="UAWB"
          title="UAWB membership checker"
          optionsList={[
            { originalName: "column1", displayName: "upi" },
            { originalName: "column2", displayName: "first name" },
            { originalName: "column3", displayName: "last name" },
          ]}
          isOnboarding={false}
        />
      </div>
    ),
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

axios.defaults.baseURL = "http://localhost:3000";

// Find the auth token in local storage if it exists
const token: string | undefined = Cookies.get("token");
if (token != undefined) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
