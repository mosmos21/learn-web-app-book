import React from "react";
import { useAuthContext } from "~/providers/AuthProvider";
import { Redirect } from "react-router-dom";
import { Template } from "~/templates/auth/signUp";

export const SignUpPage = () => {
  const { isSignedIn } = useAuthContext();
  if (isSignedIn) return <Redirect to="/auth/sign_in" />

  return (
    <Template />
  );
}
