import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";
import CreatePoll from "../components/CreatePoll";

const Layout = () => {
  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <HowToVote style={{ marginRight: "0.5em" }} />
          <Typography variant="h6">Polling App</Typography>
        </Toolbar>
      </AppBar>
      <CreatePoll />
    </>
  );
};

export default Layout;
