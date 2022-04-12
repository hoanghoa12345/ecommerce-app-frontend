import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.js";
import { UserWrapper } from "./context/user";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserWrapper>
        <App />
      </UserWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
