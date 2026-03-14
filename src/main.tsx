import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";
import { EnterpriseAccessProvider } from "@/app/providers/EnterpriseAccessContext";
import { ColorModeProvider } from "@/theme/color-mode";

import "@/styles/globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' was not found.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ColorModeProvider>
        <EnterpriseAccessProvider>
          <App />
        </EnterpriseAccessProvider>
      </ColorModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);