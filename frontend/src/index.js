import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Set the document title for accessibility & SEO
document.title = "Louder World: Sydney Events";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
