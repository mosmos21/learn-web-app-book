import React from "react";
import { Routes } from "~/pages/Routes";
import { AuthProvider } from "~/providers/AuthProvider";
import { SnackbarProvider } from "~/providers/SnackbarProvider";

export const App = () => (
  <AuthProvider>
    <SnackbarProvider>
      <Routes />
    </SnackbarProvider>
  </AuthProvider>
);
