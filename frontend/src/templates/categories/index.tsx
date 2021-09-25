import { Box, Container } from "@mui/material";
import React from "react";
import { DefaultLayout } from "~/layouts/DefaultLayout";
import { Form } from "~/templates/categories/Form";
import { Table } from "~/templates/categories/Table";
import { useHook } from "~/templates/categories/useHook";

export const Template = () => {
  const [{ categories }, { addCategory, removeCategory }] = useHook();

  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        <Form onSubmit={addCategory} />
        <Box sx={{ margin: 3 }}>
          <Table categories={categories} onClickDelete={removeCategory} />
        </Box>
      </Container>
    </DefaultLayout>
  );
};
