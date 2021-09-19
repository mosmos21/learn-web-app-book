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
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  categories: SchemaModel.CategoryWithCount[];
  onClickDelete: (idx: number) => void;
};

export const Table: React.VFC<Props> = ({ categories, onClickDelete }) => {
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, idx) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Link to={`/?categoryId=${category.id}`}>
                  <Typography sx={{ textDecoration: "underline" }}>{category.taskCount}</Typography>
                </Link>
              </TableCell>
              <TableCell>
                {category.taskCount === 0 && (
                  <IconButton onClick={handleClickDelete[idx]}>
                    <Delete />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};
