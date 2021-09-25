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
import { StatusChipCell } from "~/templates/top/Table/StatusChipCell";

type Props = {
  tasks: SchemaModel.Task[];
  onClickTaskChip: (id: number, status: SchemaModel.TaskStatus) => void;
};

export const Table: React.VFC<Props> = ({ tasks, onClickTaskChip }) => {
  const handleClickTaskStatus = React.useMemo(
    () =>
      tasks.map(
        ({ id }) =>
          (status: SchemaModel.TaskStatus) =>
            onClickTaskChip(id, status),
      ),
    [tasks],
  );

  return (
    <TableContainer component={Paper}>
      <BaseTable>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Status</TableCell>
          <TableCell />
        </TableHead>
        <TableBody>
          {tasks.map((task, idx) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>
                <Link to={`/?categoryId=${task.category.id}`}>
                  <Typography sx={{ textDecoration: "underline" }}>{task.category.name}</Typography>
                </Link>
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <StatusChipCell currentStatus={task.status} onClickChip={handleClickTaskStatus[idx]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};
