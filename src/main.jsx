import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import store from "./state/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./router/routes";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
