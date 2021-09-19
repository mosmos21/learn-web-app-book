import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { Template } from "~/templates/auth/signIn";

export const SignInPage = () => {
  const { isSignedIn } = useAuthContext();
  if (isSignedIn) return <Redirect to="/" />;

  return <Template />;
};
