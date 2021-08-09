import React from "react";
import { SignInForm } from "~/components/molecules/SignInForm";
import { useHook } from "~/templates/auth/sign_in/useHook";

export const Template = () => {
  const { handleSubmitForm } = useHook();

  return (
    <SignInForm onSubmit={handleSubmitForm} />
  )
}
