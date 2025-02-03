import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/index.css";
import { AuthContextProvider } from "./app/context/auth_context.tsx";
import { WithdrawContextProvider } from "./app/context/withdraw_context.tsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: 'c49e1939-4b53-4738-bb64-41fb2990e41c',
    authority: 'https://login.microsoftonline.com/c49e1939-4b53-4738-bb64-41fb2990e41c/oauth2/v2.0/authorize',
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
    <AuthContextProvider>
      <WithdrawContextProvider>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </WithdrawContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
