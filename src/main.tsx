import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { AuthProvider } from "@/auth/AuthContext";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";
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
        <AuthProvider>
          <App />
        </AuthProvider>
      </ColorModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
