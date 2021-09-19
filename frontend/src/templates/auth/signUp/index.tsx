import { Box } from "@mui/material";
import React from "react";
import { SignUpForm } from "~/containers/SignUpForm";
import { TitleOnlyLayout } from "~/layouts/TitleOnlyLayout";
import { useHook } from "~/templates/auth/signUp/useHook";

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
