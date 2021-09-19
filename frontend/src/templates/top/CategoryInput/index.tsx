import React from "react";
import { SchemaModel } from "@app/schema";
import {
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  SelectChangeEvent,
  colors,
} from "@mui/material";

type Props = {
  categories: SchemaModel.Category[];
  value: string;
  onChange: (value: string) => void;
};

export const CategoryInput: React.VFC<Props> = ({ categories, value, onChange }) => {
  const [showsTextInput, setShowsTextInput] = React.useState(true);

  const handleChangeTextInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const handleChangeSelectInput = React.useCallback(
    (e: SelectChangeEvent) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const handleClickCheckBox = React.useCallback((_, checked: boolean) => {
    setShowsTextInput(checked);
  }, []);

  React.useEffect(() => {
    setShowsTextInput(categories.length === 0);
  }, [categories]);

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ width: 200 }}>
        <InputLabel shrink sx={{ backgroundColor: colors.common.white }}>
          Category
        </InputLabel>
        {showsTextInput ? (
          <TextField value={value} onChange={handleChangeTextInput} />
        ) : (
          <Select value={value} onChange={handleChangeSelectInput}>
            {categories.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
      {categories.length > 0 && (
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleClickCheckBox} />}
          label="Create new category."
          sx={{ marginLeft: 1 }}
        />
      )}
    </Box>
  );
};
