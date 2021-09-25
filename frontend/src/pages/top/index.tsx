import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { Template } from "~/templates/top";
import { useQuery } from "~/hooks/useQuery";

export const TopPage = () => {
  const { isSignedIn } = useAuthContext();
  const query = useQuery();

  if (!isSignedIn) return <Redirect to="/auth/sign_in" />;

  return <Template />;
};
