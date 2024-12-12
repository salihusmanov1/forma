import Layout from "@/components/layouts/Layout";
import Home from "@/pages/Home";
import Main from "../pages/Main";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Form from "../pages/Form";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            Component: Home,
            index: true,
          },
          {
            path: "/main",
            Component: Main,
          },
          {
            path: "",
            Component: ProtectedRoutes,
            children: [
              {
                path: "/form",
                Component: Form,
              },
            ],
          },
        ],
      },
    ],
  },
]);
