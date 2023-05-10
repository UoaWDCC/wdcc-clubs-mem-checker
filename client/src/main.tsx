import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/home";
import { ExamplePage } from "./pages/example/page";
import CreateCheckerPage from "./components/create-checker-page/CreateCheckerPage";
import ClubDetailPage from "./components/club-detail-page/ClubDetailPage";

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
    path: "/club-detail-page",
    element: <ClubDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
