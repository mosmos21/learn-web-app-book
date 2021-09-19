import { Box, BoxProps, colors } from "@mui/material";
import React from "react";

export const FormCard: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box sx={{ margin: 3, border: `1px solid ${colors.grey[200]}`, borderRadius: 1, padding: 2 }} {...props}>
    {children}
  </Box>
);
