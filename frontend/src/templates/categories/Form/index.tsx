import React from "react"
import { Button, makeStyles, TextField, Box } from "@material-ui/core";

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
  onSubmit: (name: string) => void;
}

export const Form = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChangeValue = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleSubmit = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  }, [value, onSubmit]);

  return (
    <Box className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="normal"
          type="text"
          label="CategoryName"
          value={value}
          onChange={handleChangeValue}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Add
        </Button>
      </form>
    </Box>
  );
}
