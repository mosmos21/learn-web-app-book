import React from "react";
import { SchemaModel, Schema } from "@app/schema";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";

export type FormData = Schema.PostTask["requestBody"];

type Props = {
  categories: SchemaModel.Category[];
  onSubmit: (formData: FormData) => void;
}

export const Form = ({ categories, onSubmit }: Props) => {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    categoryName: ""
  });

  const handleChangeCategory = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({ ...formData, categoryName: String(event.target.value) });
  }, [formData]);

  const handleChangeTitle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: event.target.value });
  }, [formData]);

  const handleSubmitForm = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmitForm}>
      <Select
        value={formData.categoryName}
        onChange={handleChangeCategory}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        required
        fullWidth
        variant="outlined"
        margin="normal"
        type="text"
        label="Title"
        value={formData.title}
        onChange={handleChangeTitle}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </form>
  );
}
