import { Button, TextField, FormControl, InputLabel } from "@mui/material";
import React from "react";
import { FormCard } from "~/components/FormCard";

type Props = {
  onSubmit: (name: string) => void;
};

export const Form = ({ onSubmit }: Props) => {
  const [value, setValue] = React.useState("");

  const handleChangeValue = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(value);
    },
    [value, onSubmit],
  );

  return (
    <FormCard>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel shrink>Category Name</InputLabel>
          <TextField
            required
            variant="outlined"
            margin="normal"
            type="text"
            value={value}
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </FormControl>
      </form>
    </FormCard>
  );
};
