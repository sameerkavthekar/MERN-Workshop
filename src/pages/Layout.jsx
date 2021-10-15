import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";
import CreatePoll from "../components/CreatePoll";
import PollTable from "../components/PollTable";

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
      <div
        style={{
          marginRight: "1em",
          marginLeft: "1em",
          marginTop: "1.5em",
          marginBottom: "1.5em",
        }}
      >
        <PollTable />
      </div>
    </>
  );
};

export default Layout;
