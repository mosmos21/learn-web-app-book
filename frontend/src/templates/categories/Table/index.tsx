import { SchemaModel } from "@app/schema";
import { Delete } from "@mui/icons-material";
import {
  TableContainer,
  Table as BaseTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
} from "@mui/material";
import React from "react";

type Props = {
  categories: SchemaModel.Category[];
  onClickDelete: (idx: number) => void;
};

export const Table: React.VFC<Props> = ({ categories, onClickDelete }: Props) => {
  const handleClickDelete = React.useMemo(
    () => categories.map((_, idx) => () => onClickDelete(idx)),
    [categories, onClickDelete],
  );

  return (
    <TableContainer component={Paper}>
      <BaseTable>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Task Count</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, idx) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>
                <IconButton onClick={handleClickDelete[idx]}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};
