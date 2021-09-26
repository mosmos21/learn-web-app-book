import { Logout } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, colors, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <Button color="inherit">top</Button>
          </Link>
          <Link to="/categories">
            <Button color="inherit">categories</Button>
          </Link>
          <Link to="/settings">
            <Button color="inherit">settings</Button>
          </Link>
          <IconButton onClick={handleClickLogout} sx={{ color: colors.common.white }}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
