import { Button, TextField, Box, FormControl, InputLabel, colors } from "@mui/material";
import React from "react";

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
    <Box sx={{ width: 300, border: `1px solid black` }}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel shrink>CategoryName</InputLabel>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            type="text"
            value={value}
            onChange={handleChangeValue}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Add
        </Button>
      </form>
    </Box>
  );
};
