import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <HowToVote style={{ marginRight: "0.5em" }} />
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <Typography variant="h6">Polling App</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
