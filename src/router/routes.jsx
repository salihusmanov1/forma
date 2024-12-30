import Layout from "@/components/layouts/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Templates from "../pages/Templates";
import Template from "../pages/Template";
import Form from "@/pages/Form";

import ProtectedRoutes from "./ProtectedRoutes";
import FormQuestions from "@/components/form/FormQuestions";

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
            path: "/template",
            Component: Template,
          },
          {
            path: "/template/:id",
            Component: Template,
          },
          {
            Component: ProtectedRoutes,
            children: [
              {
                path: "/form/:id",
                Component: Form,
              },
              {
                path: ":id",
                Component: Form,
              },
            ],
          },
        ],
      },
    ],
  },
]);
