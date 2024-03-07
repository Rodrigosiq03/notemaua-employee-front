import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/index.css";
import { EmployeeContextProvider } from "./app/context/employee_context.tsx";
import { WithdrawContextProvider } from "./app/context/withdraw_context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EmployeeContextProvider>
      <WithdrawContextProvider>
        <App />
      </WithdrawContextProvider>
    </EmployeeContextProvider>
  </React.StrictMode>
);
