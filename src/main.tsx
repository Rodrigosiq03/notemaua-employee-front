import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/index.css";
import { AuthContextProvider } from "./app/context/auth_context.tsx";
import { WithdrawContextProvider } from "./app/context/withdraw_context.tsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
    redirectUri: 'https://mnote-001.d3nlqm8myh3fot.amplifyapp.com',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};



const msalInstance = new PublicClientApplication(msalConfig)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WithdrawContextProvider>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </WithdrawContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
