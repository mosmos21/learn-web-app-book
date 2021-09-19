import { Logout } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, colors } from "@mui/material";
import React from "react";
import { useAuthContext } from "~/providers/AuthProvider";

export const DefaultLayout: React.FC = ({ children }) => {
  const authCtx = useAuthContext();

  const handleClickLogout = React.useCallback(async () => {
    if (!authCtx.isSignedIn) return;

    await authCtx.signOut();
  }, [authCtx]);

  return (
    <>
      <AppBar sx={{ position: "static" }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Todo Application</Typography>
          <IconButton onClick={handleClickLogout} sx={{ color: colors.common.white }}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
