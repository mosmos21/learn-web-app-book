import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { Template } from "~/templates/categories";

export const CategoriesPage = () => {
  const { isSignedIn } = useAuthContext();
  if (!isSignedIn) return <Redirect to="/auth/sign_in" />;

  return <Template />;
};
