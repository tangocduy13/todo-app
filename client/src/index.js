import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    <App />
  </React.StrictMode>
);
