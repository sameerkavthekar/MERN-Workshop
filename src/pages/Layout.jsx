import * as React from "react";
import Navbar from "../components/Navbar";
import CreatePoll from "../components/CreatePoll";
import PollTable from "../components/PollTable";

const Layout = () => {
  return (
    <>
      <Navbar />
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
