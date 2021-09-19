import React from "react";
import { Box } from "@mui/material";
import { SignUpForm } from "~/containers/SignUpForm";
import { useHook } from "~/templates/auth/signUp/useHook";
import { TitleOnlyLayout } from "~/layouts/TitleOnlyLayout";

export const Template = () => {
  const { handleSubmitForm } = useHook();

  return (
    <TitleOnlyLayout>
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SignUpForm onSubmit={handleSubmitForm} />
      </Box>
    </TitleOnlyLayout>
  );
};
