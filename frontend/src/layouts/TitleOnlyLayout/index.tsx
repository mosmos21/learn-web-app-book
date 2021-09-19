import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

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
