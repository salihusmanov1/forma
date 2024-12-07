import Layout from "@/components/layouts/Layout";
import Home from "@/pages/Home";
import Main from "./pages/Main";
import { createBrowserRouter } from "react-router";
import App from "./App";

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
        ],
      },
    ],
  },
]);
