import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Grid,
  Card,
  CardContent,
  makeStyles,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [votes, setVotes] = useState([]);
  const [question, setQuestion] = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    axios
      .get(`http://localhost:5000/api/polls/get-poll/${params.id}`)
      .then((res) => {
        let temp_labels = [];
        let temp_votes = [];
        res.data.polls.options.forEach((ele) => {
          temp_labels.push(ele.title);
        });
        res.data.polls.options.forEach((ele) => {
          temp_votes.push(ele.votes);
        });
        setLabels(temp_labels);
        setVotes(temp_votes);
        setLoading(false);
        setQuestion(res.data.polls.question);
      })
      .catch((e) => console.log(e));
  }, []);

  const resultData = {
    labels: labels,
    datasets: [
      {
        label: "Votes recorded",
        backgroundColor: ["#7431a7", "#6b969b"],
        data: votes,
      },
    ],
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.up("xs")]: {
        width: 300,
        height: 170,
      },
      [theme.breakpoints.up("sm")]: {
        width: 425,
        height: 250,
      },
      [theme.breakpoints.up("md")]: {
        width: 600,
        height: 350,
      },
      [theme.breakpoints.up("lg")]: {
        width: 600,
        height: 350,
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Navbar />
      {loading ? (
        <center style={{ marginTop: "5em" }}>
          <CircularProgress />
        </center>
      ) : (
        <>
          <Typography style={{ fontSize: "1.5em", marginTop: "1em" }}>
            <center>{question}</center>
          </Typography>
          <Grid container justify="center" style={{ marginTop: "2em" }}>
            <Grid item>
              <Card className={classes.root}>
                <CardContent>
                  <Bar
                    data={resultData}
                    options={{
                      title: {
                        display: true,
                        text: "Votes Recorded",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginTop: "1.5em" }}
                startIcon={<ArrowBackIos />}
              >
                Go Back
              </Button>
            </Link>
          </Grid>
        </>
      )}
    </>
  );
};

export default Results;
