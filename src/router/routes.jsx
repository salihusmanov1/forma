import Layout from "@/components/layouts/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Templates from "../pages/Templates";
import Template from "../pages/Template";

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
            path: "/templates",
            Component: Templates,
          },
          {
            path: "",
            Component: ProtectedRoutes,
            children: [
              {
                path: "/template",
                Component: Template,
              },
            ],
          },
        ],
      },
    ],
  },
]);
