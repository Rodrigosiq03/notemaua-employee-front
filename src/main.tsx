import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/index.css";
import { EmployeeContextProvider } from "./app/context/employee_context.tsx";
import { WithdrawContextProvider } from "./app/context/withdraw_context.tsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: 'e4319f55-1c54-4a98-b605-c0573732be8e',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'https://dev.d2znmwvrcndbeo.amplifyapp.com',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};



const msalInstance = new PublicClientApplication(msalConfig)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EmployeeContextProvider>
      <WithdrawContextProvider>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </WithdrawContextProvider>
    </EmployeeContextProvider>
  </React.StrictMode>
);
