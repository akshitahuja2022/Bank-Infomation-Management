import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/AuthContext";
import { AccountProvider } from "./Context/AccountContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </UserProvider>
  </BrowserRouter>
);
reportWebVitals();
