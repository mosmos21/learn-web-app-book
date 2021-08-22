import React from "react"
import {
  TextField,
  Button,
  Box,
  makeStyles
} from "@material-ui/core";
import { SignInProps } from "~/providers/AuthProvider";

export type FormData = SignInProps;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    marginTop: theme.spacing(1)
  },
  submitButton: {
    margin: theme.spacing(2, 0)
  }
}));

type Props = {
  onSubmit: (formData: FormData) => void;
}

export const SignInForm = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState<FormData>({
    loginId: "",
    password: ""
  })

  const handleSubmitForm = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  }, [onSubmit, formData]);

  const handleChangeLoginId = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, loginId: event.target.value });
  }, [formData]);

  const handleChangePassword = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: event.target.value });
  }, [formData]);

  return (
    <Box className={classes.paper}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Sign In
        </Button>
      </form>
    </Box>
  )
}
