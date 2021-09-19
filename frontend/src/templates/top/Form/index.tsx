import React from "react";
import { SchemaModel, Schema } from "@app/schema";
import { TextField, Button, Box, colors, FormControl, InputLabel } from "@mui/material";
import { CategoryInput } from "~/templates/top/CategoryInput";

export type FormData = Schema.PostTasks["requestBody"];

type Props = {
  categories: SchemaModel.Category[];
  onSubmit: (formData: FormData) => void;
};

export const Form = ({ categories, onSubmit }: Props) => {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    content: "",
    categoryName: "",
  });

  const handleChangeCategory = React.useCallback(
    (categoryName: string) => {
      setFormData({ ...formData, categoryName });
    },
    [formData],
  );

  const handleChangeTitle = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, title: event.target.value });
    },
    [formData],
  );

  const handleSubmitForm = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(formData);
    },
    [formData],
  );

  return (
    <Box sx={{ margin: 3, border: `1px solid ${colors.grey[200]}`, borderRadius: 1, padding: 2 }}>
      <form onSubmit={handleSubmitForm}>
        <CategoryInput categories={categories} value={formData.categoryName} onChange={handleChangeCategory} />
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel shrink>Title</InputLabel>
          <TextField
            required
            variant="outlined"
            margin="normal"
            type="text"
            value={formData.title}
            onChange={handleChangeTitle}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
