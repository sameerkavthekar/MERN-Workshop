import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  CardActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";

const CastPoll = () => {
  const [pollID, setPollID] = useState();
  const [pollData, setPollData] = useState();
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);

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
      .then((res) => console.log(res.data));
  };

  return (
    <>
      {loading ? (
        <center style={{ margin: "5em" }}>
          <CircularProgress />
        </center>
      ) : (
        <Grid container justify="center" style={{ marginTop: "2em" }}>
          <Grid item>
            <Card style={{ minWidth: 350 }} variant="outlined">
              <CardContent>
                <div style={{ fontSize: 30 }}>{pollData.pollName}</div>
                <div style={{ fontSize: 18 }}>
                  <p>Question: {pollData.question}</p>
                  Options:
                  <br />
                </div>
                <RadioGroup aria-label="options" name="radio-buttons-group">
                  {pollData.options.map((element, index) => (
                    <FormControlLabel
                      value={"" + element.id}
                      control={<Radio />}
                      label={element.title}
                      onChange={(e) => setOption(e.target.value)}
                      key={index}
                    />
                  ))}
                </RadioGroup>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  disabled={option === null}
                  variant="outlined"
                  onClick={submitPoll}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CastPoll;
