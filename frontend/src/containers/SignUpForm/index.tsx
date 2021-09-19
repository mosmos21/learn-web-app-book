import React from "react";
import { TextField, Button, Box, FormControl, InputLabel, colors } from "@mui/material";
import { SignUpProps } from "~/providers/AuthProvider";

export type FormData = SignUpProps;

type Props = {
  onSubmit: (formData: FormData) => void;
};

export const SignUpForm = ({ onSubmit }: Props) => {
  const [formData, setFormData] = React.useState<FormData>({
    loginId: "",
    name: "",
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

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, name: event.target.value });
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
        <FormControl fullWidth>
          <InputLabel shrink>Login ID</InputLabel>
          <TextField
            required
            autoFocus
            variant="outlined"
            margin="normal"
            autoComplete="loginId"
            value={formData.loginId}
            onChange={handleChangeLoginId}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel shrink>Name</InputLabel>
          <TextField required variant="outlined" margin="normal" value={formData.name} onChange={handleChangeName} />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel shrink>Password</InputLabel>
          <TextField
            required
            variant="outlined"
            margin="normal"
            type="password"
            autoComplete="password"
            value={formData.password}
            onChange={handleChangePassword}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 3 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
