import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { Template } from "~/templates/top";

export const TopPage = () => {
  const { isSignedIn } = useAuthContext();
  if (!isSignedIn) return <Redirect to="/auth/sign_in" />;

  return <Template />;
};
