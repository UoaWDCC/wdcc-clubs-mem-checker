import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/home";
import { ExamplePage } from "./pages/example/page";
import CreateCheckerPage from "./components/create-checker-page/CreateCheckerPage";
import InviteCodePage from "./pages/invite-code/InviteCodePage";

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
    path: "/invite-code",
    element: <InviteCodePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
