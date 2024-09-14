import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import router from "./router.tsx";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./context/AuthContext.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MantineProvider>
        <Notifications position="top-right" />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {router.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((childRoute, childIndex) => (
                      <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                </Route>
              ))}
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </AuthProvider>
      </MantineProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
