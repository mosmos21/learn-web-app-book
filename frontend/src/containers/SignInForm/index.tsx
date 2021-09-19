import { TextField, Button, Box, colors } from "@mui/material";
import React from "react";
import { SignInProps } from "~/providers/AuthProvider";

export type FormData = SignInProps;

type Props = {
  onSubmit: (formData: FormData) => void;
};

export const SignInForm = ({ onSubmit }: Props) => {
  const [formData, setFormData] = React.useState<FormData>({
    loginId: "",
    password: "",
  });

  const handleSubmitForm = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(formData);
    },
    [onSubmit, formData],
  );

  const handleChangeLoginId = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, loginId: event.target.value });
    },
    [formData],
  );

  const handleChangePassword = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, password: event.target.value });
    },
    [formData],
  );

  return (
    <Box sx={{ width: 400, border: `1px solid ${colors.grey[200]}`, borderRadius: 1, padding: 3 }}>
      <form onSubmit={handleSubmitForm}>
        <TextField
          required
          fullWidth
          autoFocus
          variant="outlined"
          margin="normal"
          label="Login ID"
          autoComplete="loginId"
          value={formData.loginId}
          onChange={handleChangeLoginId}
        />
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="normal"
          type="password"
          label="Password"
          autoComplete="password"
          value={formData.password}
          onChange={handleChangePassword}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Box>
  );
};
