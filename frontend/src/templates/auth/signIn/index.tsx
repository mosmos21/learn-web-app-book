import { Box } from "@mui/material";
import React from "react";
import { SignInForm } from "~/containers/SignInForm";
import { TitleOnlyLayout } from "~/layouts/TitleOnlyLayout";
import { useHook } from "~/templates/auth/signIn/useHook";

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
