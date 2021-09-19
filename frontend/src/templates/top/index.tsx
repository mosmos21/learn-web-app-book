import React from "react";
import { DefaultLayout } from "~/layouts/DefaultLayout";
import { Form } from "~/templates/top/Form";
import { useHook } from "~/templates/top/useHook";
import { Table } from "~/templates/top/Table";
import { Box } from "@mui/material";

export const Template = () => {
  const [{ categories, tasks }, { addTask }] = useHook();

  return (
    <DefaultLayout>
      <Form categories={categories} onSubmit={addTask} />
      <Box sx={{ margin: 3 }}>
        <Table tasks={tasks} />
      </Box>
    </DefaultLayout>
  );
};
