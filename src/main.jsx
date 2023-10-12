import React from "react";
import ReactDOM from "react-dom/client";
import "material-symbols/outlined.css";
import "modern-normalize";
import "./main.css";
import { App } from "./pages/App.jsx";
import { AppProvider } from "./context/app/AppProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
