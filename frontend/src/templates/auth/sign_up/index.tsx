import React from "react";
import { SignUpForm } from "~/components/molecules/SignUpForm";
import { useHook } from "~/templates/auth/sign_up/useHook";

export const Template = () => {
  const { handleSubmitForm } = useHook();

  return (
    <SignUpForm onSubmit={handleSubmitForm} />
  )
}
