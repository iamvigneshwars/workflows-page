import React from "react";
import ReactDOM from "react-dom/client";
import VisitDropdown from "./VisitDropdown.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./sytles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VisitDropdown />
  </React.StrictMode>
);
