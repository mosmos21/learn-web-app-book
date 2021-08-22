import React from "react";
import { SchemaModel, Schema } from "@app/schema";
import { TextField, Select, MenuItem } from "@material-ui/core";

type FormData = Schema.PostTask["requestBody"];

type Props = {
  categories: SchemaModel.Category[];
  onSubmit: (formData: FormData) => void;
}

export const Form = ({ categories, onSubmit }: Props) => {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    categoryName: ""
  });

  const handleChangeCategory = React.useCallback((event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    console.log(event.target);
    setFormData({ ...formData, categoryName: event.target.name || "" });
  }, [formData]);

  const handleChangeTitle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: event.target.value });
  }, [formData]);

  const handleSubmitForm = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  }, []);

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
    </form>
  );
}
