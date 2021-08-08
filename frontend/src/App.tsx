import React from "react"
import { Routes } from "~/pages/Routes";
import { AuthProvider } from "~/providers/AuthProvider";

export const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);
