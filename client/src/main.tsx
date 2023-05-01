import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IndexPage } from "./pages/index/page";
import { ExamplePage } from "./pages/example/page";
import CreateCheckerPage from "./components/create-checker-page/CreateCheckerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/example",
    element: <ExamplePage />,
  },
  {
    path: "/createCheckerPage",
    element: <CreateCheckerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
