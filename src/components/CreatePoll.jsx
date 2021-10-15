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

const CreatePoll = () => {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [name, setName] = React.useState("");
  const [question, setQuestion] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCount = () => {
    setCount(count + 1);
  };

  const deleteCount = () => {
    setCount(count - 1);
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
                />
              </Grid>
              <Grid container lg={8}>
                <Grid item>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="option"
                    label="Option 1"
                    type="text"
                    fullWidth
                    variant="standard"
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
              </Grid>
              {_.times(count - 1, (index) => {
                return (
                  <Grid container lg={8}>
                    <Grid item>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="option"
                        label={`Option ${index + 2}`}
                        type="text"
                        fullWidth
                        variant="standard"
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
                    <Grid item>
                      <IconButton
                        style={{ marginTop: "0.25em" }}
                        onClick={deleteCount}
                      >
                        <IndeterminateCheckBox color="secondary" />
                      </IconButton>
                    </Grid>
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
            <Button onClick={handleClose} color="primary" endIcon={<Create />}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default CreatePoll;
