import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./main.css";
import { App } from "./pages/app.jsx";
import { AppProvider } from "./context/app/appProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
