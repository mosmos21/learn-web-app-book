import React from "react";
import { SignUpForm } from "~/containers/SignUpForm";
import { useHook } from "~/templates/auth/signUp/useHook";

export const Template = () => {
  const { handleSubmitForm } = useHook();

  return (
    <SignUpForm onSubmit={handleSubmitForm} />
  );
}
