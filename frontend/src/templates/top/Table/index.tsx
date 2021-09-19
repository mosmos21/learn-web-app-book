import { SchemaModel } from "@app/schema";
import {
  TableContainer,
  Table as BaseTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  tasks: SchemaModel.Task[];
};

export const Table: React.VFC<Props> = ({ tasks }) => {
  return (
    <TableContainer component={Paper}>
      <BaseTable>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Status</TableCell>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>
                <Link to={`/?categoryId=${task.category.id}`}>
                  <Typography sx={{ textDecoration: "underline" }}>{task.category.name}</Typography>
                </Link>
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};
