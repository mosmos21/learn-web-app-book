import React from "react"
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  makeStyles
} from "@material-ui/core";

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

export type FormData = {
  loginId: string;
  name: string;
  password: string;
}

type Props = {
  onSubmit: (formData: FormData) => void;
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<FormData>();

  const handleSubmitForm = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Box className={classes.paper}>
      <form onSubmit={handleSubmitForm}>
        <Controller
          name="loginId"
          control={control}
          defaultValue=""
          render={(({ field}) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              label="Login ID"
              autoComplete="loginId"
              {...field}
            />
          ))}
        />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={(({ field}) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              {...field}
            />
          ))}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={(({ field}) => (
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              label="Password"
              autoComplete="password"
              {...field}
            />
          ))}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  )
}
