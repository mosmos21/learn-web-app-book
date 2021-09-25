import React from "react";
import { Chip, Stack } from "@mui/material";
import { SchemaModel } from "@app/schema";

type Props = {
  currentStatus: SchemaModel.TaskStatus;
  onClickChip: (status: SchemaModel.TaskStatus) => void;
};

const statuses: SchemaModel.TaskStatus[] = ["NEW", "DOING", "COMPLETED"];

export const StatusChipCell: React.VFC<Props> = ({ currentStatus, onClickChip }) => {
  const handleClickChip: Record<SchemaModel.TaskStatus, () => void> = React.useMemo(
    () => ({
      NEW: () => onClickChip("NEW"),
      DOING: () => onClickChip("DOING"),
      COMPLETED: () => onClickChip("COMPLETED"),
    }),
    [onClickChip],
  );

  return (
    <Stack direction="row" spacing={1}>
      {statuses.map((status) => (
        <Chip
          color="primary"
          variant={status === currentStatus ? "filled" : "outlined"}
          label={status}
          key={status}
          onClick={handleClickChip[status]}
        />
      ))}
    </Stack>
  );
};
