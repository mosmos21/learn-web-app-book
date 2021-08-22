import React from "react";
import { SignInForm } from "~/containers/SignInForm";
import { useHook } from "~/templates/auth/signIn/useHook";

export const Template = () => {
  const { handleSubmitForm } = useHook();

  return (
    <SignInForm onSubmit={handleSubmitForm} />
  )
}
