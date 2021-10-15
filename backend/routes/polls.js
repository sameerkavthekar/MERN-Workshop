const router = require("express").Router();
const Poll = require("../models/User.model");

router.get("/get-poll", async (req, res) => {
  try {
    let polls = await Poll.find();

    return res.status(200).send({ polls });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

module.exports = router;
