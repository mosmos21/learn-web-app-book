import React from "react";
import { Template } from "~/templates/auth/sign_in";
import { useAuthContext } from "~/providers/AuthProvider";
import { Redirect } from "react-router-dom";

export const SignInPage = () => {
  const { isSignedIn } = useAuthContext();
  if (isSignedIn) return <Redirect to="/" />;

  return (
    <Template />
  );
}
