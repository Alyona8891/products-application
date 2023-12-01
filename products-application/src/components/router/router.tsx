import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { MainPage } from "../pages/MainPage/MainPage";
import { ControlledPage } from "../pages/ControlledPage/ControlledPage";
import { UncontrolledPage } from "../pages/UncontrolledPage/UncontrolledPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      { path: "main", element: <MainPage /> },
      { path: "", element: <MainPage /> },
      { path: "uncontrolled", element: <UncontrolledPage /> },
      { path: "controlled", element: <ControlledPage /> },
    ],
  },
]);
