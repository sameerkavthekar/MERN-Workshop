const router = require("express").Router();
const Poll = require("../models/Poll.model");

router.get("/get-polls", async (req, res) => {
  try {
    let polls = await Poll.find();

    return res.status(200).send({ polls });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

router.post("/create-poll", async (req, res) => {
  let { pollName, question, options } = req.body;
  const newPoll = new Poll({
    pollName,
    question,
    options,
  });
  try {
    newPoll
      .save()
      .then(() => {
        return res.status(200).send({ msg: "New poll created", poll: newPoll });
      })
      .catch((err) => {
        return res.status(400).send("Error:" + err);
      });
  } catch (e) {
    console.log(e);
  }
});

router.post("/cast-vote", async (req, res) => {
  let { pollId, optionId } = req.body;
  try {
    let poll = await Poll.findById(pollId);
    if (!poll) {
      res.status(400).send("Poll with id not found");
    }
    let updateIndex;
    poll._doc.options.map((option, index) => {
      if (option.id == optionId) {
        updateIndex = index;
      }
    });
    temp_options = poll._doc.options;
    temp_options[updateIndex].votes = temp_options[updateIndex].votes + 1;
    Poll.findOneAndUpdate(
      { _id: req.body.pollId },
      { $set: { options: temp_options } }
    )
      .then((post) =>
        res.status(200).send({ poll: poll, msg: "Votes updated" })
      )
      .catch((err) => res.status(400).send("Error: " + err));
  } catch (e) {
    console.log(e);
  }
});

router.get("/get-poll/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let polls = await Poll.findById(id);
    if (polls) {
      return res.status(200).send({ polls });
    } else {
      return res.status(400).send({ err: "Incorrect ID" });
    }
  } catch (err) {
    return res.status(400).send({ err });
  }
});

module.exports = router;
