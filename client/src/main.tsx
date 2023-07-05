import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import ClubCheckerPage from "./pages/club-checker-page/ClubCheckerPage";

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
    element: <NoClubs />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
    path: "/checker-page",
    element: (
      // example props
      <ClubCheckerPage
        clubId={1}
        clubName="UAWB"
        title="UAWB membership checker"
        backgroundColor="#ECECEC"
        titleTextColor="black"
        textFieldBackgroundColor="#E0E0E0"
        textFieldTextColor="#000000"
        buttonBackgroundColor="#C1C1C2"
        dropDownBackgroundColor="#4F4F4F"
        // clubLogoUrl="test" // temp value
        backgroundImageUrl="testBackground" // temp value
        optionsList={["upi", "first name", "last name", "student id"]}
        isOnboarding={false}
      />
    ),
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
