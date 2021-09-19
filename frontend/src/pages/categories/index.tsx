import React from "react";
import { Template } from "~/templates/categories";
import { useAuthContext } from "~/providers/AuthProvider";
import { Redirect } from "react-router-dom";

export const CategoriesPage = () => {
  const { isSignedIn } = useAuthContext();
  if (!isSignedIn) return <Redirect to="/auth/sign_in" />;

  return <Template />;
};
