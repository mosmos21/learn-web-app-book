import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const TitleOnlyLayout: React.FC = ({ children }) => (
  <>
    <AppBar>
      <Toolbar>
        <Typography>Todo Application</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </>
);
