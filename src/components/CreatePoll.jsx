import * as React from "react";
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  IconButton,
} from "@material-ui/core";
import {
  AddCircle,
  IndeterminateCheckBox,
  Create,
  Close,
} from "@material-ui/icons";
import _ from "lodash";
import axios from "axios";

const CreatePoll = () => {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [name, setName] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCount = () => {
    setCount(count + 1);
  };

  const deleteCount = (index) => {
    let tempArr = [...options];
    tempArr.splice(index, 1);
    setOptions(tempArr);
    setCount(count - 1);
  };

  const validateInput = () => {
    let tempArr = [...options];
    if(options.length === 0 || question === "" || name === "") return false;
    return true;
  };

  const submitPoll = () => {
    if (!validateInput()) {
      alert("Enter all values!");
      return;
    } else {
      let tempArr = [...options];
      tempArr.forEach((element, index) => {
        element["id"] = index + 1;
      });

      axios
        .post("http://localhost:5000/api/polls/create-poll", {
          pollName: name,
          question,
          options: tempArr,
        })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
    }
  };

  return (
    <Grid container justify="center" style={{ marginTop: "2em" }}>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Create a Poll
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create a Poll</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new poll, enter all the details as required below!
            </DialogContentText>
            <Grid container style={{ marginLeft: "1em" }}>
              <Grid item lg={10} xs={11}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name of Poll"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item lg={10} xs={11}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="question"
                  label="Question"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </Grid>
              {_.times(count, (index) => {
                return (
                  <Grid container lg={8}>
                    <Grid item>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="option"
                        label={`Option ${index + 1}`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={options[index] ? options[index].title : ""}
                        onChange={(e) => {
                          let tempArr = [...options];
                          tempArr[index] = { title: e.target.value, votes: 0 };
                          setOptions(tempArr);
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        style={{ marginTop: "0.25em" }}
                        onClick={addCount}
                      >
                        <AddCircle color="primary" />
                      </IconButton>
                    </Grid>
                    {index !== 0 && (
                      <Grid item>
                        <IconButton
                          style={{ marginTop: "0.25em" }}
                          onClick={() => deleteCount(index)}
                        >
                          <IndeterminateCheckBox color="secondary" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              startIcon={<Close />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              endIcon={<Create />}
              onClick={submitPoll}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default CreatePoll;
