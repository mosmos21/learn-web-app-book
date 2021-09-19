import React from "react";
import { SignInForm } from "~/containers/SignInForm";
import { useHook } from "~/templates/auth/signIn/useHook";
import { TitleOnlyLayout } from "~/layouts/TitleOnlyLayout";
import { Box } from "@mui/material";

export const Template = () => {
  const { handleSubmitForm } = useHook();

  return (
    <TitleOnlyLayout>
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SignInForm onSubmit={handleSubmitForm} />
      </Box>
    </TitleOnlyLayout>
  );
};
