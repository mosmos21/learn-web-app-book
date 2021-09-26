import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "~/providers/AuthProvider";
import { Template } from "~/templates/top";
import { useQuery } from "~/hooks/useQuery";

type Query = {
  categoryId?: number;
};

export const TopPage = () => {
  const { isSignedIn } = useAuthContext();
  const query = useQuery<Query>();

  if (!isSignedIn) return <Redirect to="/auth/sign_in" />;

  return <Template {...query} />;
};
