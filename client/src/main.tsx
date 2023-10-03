import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/home";
import CreateCheckerPage from "./pages/create-checker-page/CreateCheckerPage";
import ClubDetailPage from "./pages/club-detail-page/ClubDetailPage";
import { GoogleSignIn } from "./pages/google-sign-in/GoogleSignInPage";
import NoClubs from "./pages/no-clubs/NoClubs";
import Dashboard from "./pages/dashboard/Dashboard";
import GoogleCallback from "./pages/google-callback/GoogleCallback";
import axios from "axios";
import Cookies from "js-cookie";
import InviteCodePage from "./pages/invite-code/InviteCodePage";
import { ConfimationPage } from "./pages/onboarding-confirmation-page/ConfirmationPage";
import PublicCheckerPage from "./pages/public-checker-page/PublicCheckerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
    path: "/confirmation",
    element: <ConfimationPage />,
  },
  {
    path: "/:webLinkId",
    element: <PublicCheckerPage />,
  },
]);

// Find the auth token in local storage if it exists
const token: string | undefined = Cookies.get("token");
if (token != undefined) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

if (import.meta.env.MODE == "production") {
  axios.defaults.baseURL = "/api/";
} else {
  axios.defaults.baseURL = "http://localhost:3000/api/";
}

function hasClubs(): boolean {
  axios
    .get("/user/organisations")
    .then((res) => {
      if (res.status === 204) {
        return true;
      }
    })
    .catch(() => false);
  return false;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
