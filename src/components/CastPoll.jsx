import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import axios from "axios";
import { ArrowBackIos, Send } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const CastPoll = () => {
  const [pollID, setPollID] = useState();
  const [pollData, setPollData] = useState();
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  useEffect(() => {
    (async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      setPollID(params.id);

      let res = await axios.get(
        `http://localhost:5000/api/polls/get-poll/${params.id}`
      );

      setPollData(res.data.polls);
      setLoading(false);
    })();
  }, []);

  const submitPoll = () => {
    axios
      .post("http://localhost:5000/api/polls/cast-vote", {
        pollId: pollID,
        optionId: option,
      })
      .then((res) => handleClickOpen());
  };

  return (
    <>
      {loading ? (
        <center style={{ margin: "5em" }}>
          <CircularProgress />
        </center>
      ) : (
        <>
          <Grid container justify="center" style={{ marginTop: "2em" }}>
            <Grid item>
              <Card style={{ minWidth: 350 }} variant="outlined">
                <CardContent>
                  <div style={{ fontSize: 30 }}>
                    <center>{pollData.pollName}</center>
                  </div>
                  <div style={{ fontSize: 18 }}>
                    <p>
                      <center>Question: {pollData.question}</center>
                    </p>
                  </div>
                  <RadioGroup aria-label="options" name="radio-buttons-group">
                    {pollData.options.map((element, index) => (
                      <center>
                        <FormControlLabel
                          value={"" + element.id}
                          control={<Radio />}
                          label={element.title}
                          onChange={(e) => setOption(e.target.value)}
                          key={index}
                        />
                      </center>
                    ))}
                  </RadioGroup>
                </CardContent>

                <center>
                  <Button
                    color="primary"
                    disabled={option === null}
                    variant="contained"
                    onClick={submitPoll}
                    style={{ margin: "1em" }}
                    startIcon={<Send />}
                  >
                    Submit
                  </Button>
                </center>
              </Card>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{ color: "#6b969b" }}>
              {"Vote Success"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Congratulations! You have successfully cast your vote!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClose}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
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

export default CastPoll;
