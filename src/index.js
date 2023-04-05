import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ProSidebarProvider } from "react-pro-sidebar";

import "./index.css";
import "./config/i18n";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/common/Loader";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
