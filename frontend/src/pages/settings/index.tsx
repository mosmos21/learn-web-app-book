import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { Template } from "~/templates/settings";

export const SettingsPage = () => {
  const { isSignedIn } = useAuthContext();
  if (!isSignedIn) return <Redirect to="/auth/sign_in" />;

  return <Template />;
};
