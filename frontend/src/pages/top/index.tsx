import React from "react";
import { Template } from "~/templates/top";
import { useAuthContext } from "~/providers/AuthProvider";
import { Redirect } from "react-router-dom";

export const TopPage = () => {
  const authContext = useAuthContext();
  if (!authContext.isSignedIn) return <Redirect to="/auth/sign_in" />;

  return (
    <Template currentUser={authContext.currentUser} />
  );
}
