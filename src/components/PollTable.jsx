import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, IconButton, CircularProgress } from "@material-ui/core";
import { Poll, HowToVote } from "@material-ui/icons";
import axios from "axios";

const PollTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/polls/get-poll")
      .then((res) => {
        setData(res.data.polls);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const columns = [
    { name: "pollName", label: "Name of Poll" },
    { name: "question", label: "Question" },
    {
      name: "Go to Poll",
      label: "Go to Poll",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton>
              <HowToVote color="primary" />
            </IconButton>
          );
        },
      },
    },
    {
      name: "View Results",
      label: "View Results",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton>
              <Poll color="secondary" />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    download: false,
    print: false,
    viewColumns: false,
    search: true,
    filter: true,
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Grid container justify="center">
            <Grid item>
              <MUIDataTable
                title={"Poll Table"}
                data={data}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default PollTable;
