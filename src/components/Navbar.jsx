import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";

const Navbar = () => {
  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <HowToVote style={{ marginRight: "0.5em" }} />
        <Typography variant="h6">Polling App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
